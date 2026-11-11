
const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

export async function questGemini(quest: string) {
    if (!API_KEY) {
        throw new Error("Chave da API nao encontrada.");
    }

    const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": API_KEY
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: quest
                            }
                        ]
                    }
                ]
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error?.message || "Erro ao consultar Gemini."
        );
    }

    return data.candidates?.[0]?.content?.parts
        ?.map((part: any) => part.text || "")
        .join("") || "";
}
