import { Response } from 'express';
import Project from '../models/project.model';
import { AuthRequest } from '../middlewares/auth.middleware';

export const getAllProjects = async (req: AuthRequest, res: Response) => {
    try {
        const projects = await Project.find().sort({ order: 1, createdAt: -1 });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects', error });
    }
};

export const getProjectById = async (req: AuthRequest, res: Response) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching project', error });
    }
};

export const createProject = async (req: AuthRequest, res: Response) => {
    try {
        const newProject = new Project(req.body);
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ message: 'Error creating project', error });
    }
};

export const updateProject = async (req: AuthRequest, res: Response) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Error updating project', error });
    }
};

export const deleteProject = async (req: AuthRequest, res: Response) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting project', error });
    }
};
