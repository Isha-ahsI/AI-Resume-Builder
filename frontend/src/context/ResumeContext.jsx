import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultResumeData, seedResumes } from "../data/mockData";

const ResumeContext = createContext(null);
const RESUMES_KEY = "rb-resumes";
const CURRENT_KEY = "rb-current-resume";

const uid = () => "r_" + Math.random().toString(36).slice(2, 10);


export const ResumeProvider = ({ children }) => {
    const [resumes, setResumes] = useState(() => {
        try {
            const stored = JSON.parse(localStorage.getItem(RESUMES_KEY));
            if (stored && Array.isArray(stored) && stored.length) return stored;
        } catch { }
        return seedResumes;
    });
    const [currentId, setCurrentId] = useState(() => localStorage.getItem(CURRENT_KEY) || (seedResumes[0]?.id ?? null));

    useEffect(() => { localStorage.setItem(RESUMES_KEY, JSON.stringify(resumes)); }, [resumes]);
    useEffect(() => { if (currentId) localStorage.setItem(CURRENT_KEY, currentId); }, [currentId]);

    const current = useMemo(() => resumes.find((r) => r.id === currentId) || resumes[0], [resumes, currentId]);

    const createResume = (partial = {}) => {
        const nr = { id: uid(), title: partial.title || "Untitled Resume", template: partial.template || "modern", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), atsScore: 68, data: { ...defaultResumeData, ...(partial.data || {}) } };
        setResumes((rs) => [nr, ...rs]);
        setCurrentId(nr.id);
        return nr;
    };
    const updateResume = (id, patch) => {
        setResumes((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch, updatedAt: new Date().toISOString() } : r)));
    };
    const updateResumeData = (id, dataPatch) => {
        setResumes((rs) => rs.map((r) => (r.id === id ? { ...r, data: { ...r.data, ...dataPatch }, updatedAt: new Date().toISOString() } : r)));
    };
    const deleteResume = (id) => {
        setResumes((rs) => rs.filter((r) => r.id !== id));
        if (currentId === id) setCurrentId(null);
    };
    const duplicateResume = (id) => {
        const source = resumes.find((r) => r.id === id);
        if (!source) return;
        const copy = { ...source, id: uid(), title: source.title + " (Copy)", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        setResumes((rs) => [copy, ...rs]);
        return copy;
    };
    const setCurrent = (id) => setCurrentId(id);

    // Auto-save signal (touch updatedAt)
    const touch = (id) => updateResume(id, {});
    return (
        <>
            <ResumeContext.Provider value={{ resumes, current, currentId, setCurrent, createResume, updateResume, updateResumeData, deleteResume, duplicateResume, touch }}>
                {children}
            </ResumeContext.Provider>
        </>
    )
}

export const useResumes = () => useContext(ResumeContext);
