import { GoogleGenAI, Type } from "@google/genai";
import { RecruitmentNotes } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateRecruitmentMaterials(data: RecruitmentNotes) {
  const prompt = `
    Based on the following raw notes for a role titled "${data.roleTitle}", generate two distinct sections:
    
    1. A polished, correctly formatted Job Description tailored for LinkedIn. 
       - Include: About the Role, Key Responsibilities, and Qualifications (Hard & Soft Skills).
       - **CRITICAL**: Include a dedicated "Our Culture, Mission & Values" section. This should be compelling, storytelling-driven, and give candidates a genuine feel for the environment and what it's like to work here. Aim to attract candidates who are a deep cultural fit.
       - Use professional, engaging language suitable for LinkedIn.
    
    2. An Interview Guide containing exactly 10 behavioral questions.
       - These questions must specifically target the soft and hard skills (including cultural alignment) mentioned in the generated Job Description.
       - Use the STAR method (Situation, Task, Action, Result) framework for the questions.
    
    Notes:
    ${data.notes}
    
    Return the result as a JSON object with two fields: "jobDescription" (Markdown string) and "interviewGuide" (Markdown string).
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          jobDescription: {
            type: Type.STRING,
            description: "Markdown string of the LinkedIn job description",
          },
          interviewGuide: {
            type: Type.STRING,
            description: "Markdown string of the 10 behavioral interview questions",
          },
        },
        required: ["jobDescription", "interviewGuide"],
      },
    },
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  
  return JSON.parse(text) as { jobDescription: string; interviewGuide: string };
}
