import cron from 'node-cron';
import CalendarMessage from '../models/calendar-message.model';
import GeneralMeetingMessage from '../models/general-meeting-message.model';
import BroadcastMessage from '../models/broadcast-message.model';

export const initializeCleanupService = () => {
    // Run every day at midnight
    cron.schedule('0 0 * * *', async () => {
        console.log('🧹 Running scheduled message cleanup...');
        
        try {
            const threeMonthsAgo = new Date();
            threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

            const calendarResult = await CalendarMessage.deleteMany({
                createdAt: { $lt: threeMonthsAgo }
            });

            const generalMeetingResult = await GeneralMeetingMessage.deleteMany({
                createdAt: { $lt: threeMonthsAgo }
            });

            const broadcastResult = await BroadcastMessage.deleteMany({
                createdAt: { $lt: threeMonthsAgo }
            });

            console.log(`✅ Cleanup complete. Deleted messages:
                - Calendar: ${calendarResult.deletedCount}
                - General Meeting: ${generalMeetingResult.deletedCount}
                - Broadcast: ${broadcastResult.deletedCount}
            `);
        } catch (error) {
            console.error('❌ Error running message cleanup:', error);
        }
    });

    console.log('🕰️  Message cleanup service initialized (runs daily at midnight)');
};
