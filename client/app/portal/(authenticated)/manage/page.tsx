'use client'

export default function ManagePage() {
    return (
        <div className="p-6">
            <div className="text-center py-12">
                <h1 className="text-3xl font-bold text-white mb-4">Content Management System</h1>
                <p className="text-purple-200/60 mb-8">Choose a section to manage</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    <a href="/admin/manage/projects" className="group p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl hover:border-purple-500/50 transition-all duration-300">
                        <div className="text-4xl mb-4">💼</div>
                        <h3 className="text-xl font-bold text-white mb-2">Projects</h3>
                        <p className="text-sm text-purple-200/60">Manage portfolio projects</p>
                    </a>
                    
                    <a href="/admin/manage/gallery" className="group p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl hover:border-purple-500/50 transition-all duration-300">
                        <div className="text-4xl mb-4">🖼️</div>
                        <h3 className="text-xl font-bold text-white mb-2">Gallery</h3>
                        <p className="text-sm text-purple-200/60">Manage image gallery</p>
                    </a>
                    
                    <a href="/admin/manage/team" className="group p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl hover:border-purple-500/50 transition-all duration-300">
                        <div className="text-4xl mb-4">👥</div>
                        <h3 className="text-xl font-bold text-white mb-2">Team</h3>
                        <p className="text-sm text-purple-200/60">Manage team members</p>
                    </a>
                    <a href="/admin/manage/content" className="group p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl hover:border-purple-500/50 transition-all duration-300">
                        <div className="text-4xl mb-4">📝</div>
                        <h3 className="text-xl font-bold text-white mb-2">Content</h3>
                        <p className="text-sm text-purple-200/60">Manage page content</p>
                    </a>
                </div>
            </div>
        </div>
    );
}
