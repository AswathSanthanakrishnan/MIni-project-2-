
import { GoogleGenAI, Type } from "@google/genai";
import { WorkerProfile } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const PROFILES_SCHEMA = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            employeeName: {
                type: Type.STRING,
                description: "The full name of the employee.",
            },
            profileSummary: {
                type: Type.STRING,
                description: "A concise summary of the employee's main contributions, skills, and areas of expertise based on the logs.",
            },
            tasks: {
                type: Type.ARRAY,
                items: { 
                    type: Type.STRING 
                },
                description: "A list of distinct problem categories or specific tasks handled by the employee."
            },
        },
        required: ["employeeName", "profileSummary", "tasks"],
    },
};

export const generateSyntheticLogs = async (): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Generate 15 realistic-looking task log entries for a software development team.
Each entry should be on a new line and include a task description, the name of the employee who completed it, and a problem category.
Use names like Alice, Bob, Charlie, Dana, Eve, and Frank.
Use categories like 'Bug Fix', 'Feature Development', 'Code Review', 'Security Patch', 'Database Migration', 'UI/UX Improvement'.
Example: 'Resolved critical login authentication bug (T-123) - Assigned to: Alice - Category: Bug Fix'`,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating synthetic logs:", error);
        throw new Error("Failed to communicate with the Gemini API.");
    }
};

export const analyzeLogsAndCreateProfiles = async (logs: string): Promise<WorkerProfile[]> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: `Analyze the following task logs. For each employee mentioned, create a profile according to the provided JSON schema. Extract their name, create a concise summary of their primary contributions and strengths, and list the categories of tasks they've worked on.\n\nLogs:\n---\n${logs}`,
            config: {
                responseMimeType: "application/json",
                responseSchema: PROFILES_SCHEMA,
            },
        });
        
        const jsonText = response.text.trim();
        const profiles: WorkerProfile[] = JSON.parse(jsonText);
        return profiles;

    } catch (error) {
        console.error("Error analyzing logs:", error);
        throw new Error("Failed to parse worker profiles from the API response.");
    }
};

export const generateManagerReport = async (profiles: WorkerProfile[]): Promise<string> => {
    const profilesContext = JSON.stringify(profiles, null, 2);
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: `Based on the following worker profiles data, generate a comprehensive performance report for a manager. 
The report should be well-structured, starting with an executive summary. Then, rank the employees based on their perceived impact, productivity, and specialization. For each employee, provide a paragraph justifying their rank. Conclude with strategic recommendations for bonus allocation.
Format the output using Markdown.

Worker Profiles Data:
---
${profilesContext}`,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating manager report:", error);
        throw new Error("Failed to communicate with the Gemini API for report generation.");
    }
};
