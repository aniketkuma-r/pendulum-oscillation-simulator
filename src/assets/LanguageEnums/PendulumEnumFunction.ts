enum PendulumEnglishLanguageEnums{
    Preferences='Preferences',
    Overview="Overview",
    Languages="Languages",
    Preference_Content="Preferences allow you to change the language of this simulation. Select your preferred language to use the simulation accordingly.",
    Information="Information",
    Description="Description",
    Theory="Theory",
    Length1="Length (Red)",
    Length2 = "Length (Blue)",
    Mass1 = "Mass (Red)",
    Mass2 = "Mass (Blue)",
    Two_Pendulums_Toggle = "Two Pendulums Toggle",
    Air_Resistance = "Damping Coefficient",
    Free_Body_Diagram="Free Body Diagram",
    Energy_Graph="Energy Graph",
    Potential_Energy="Potential Energy",
    Kinetic_Energy="Kinetic Energy",
    Mechanical_Energy="Mechanical Energy",
    Description_Content="The simulation will feature a virtual pendulum system where students can observe the motion of one or two pendulums under various conditions. The simulation will include adjustable parameters like length, mass, and air resistance, along with visual representations of forces, energy distribution, and the effects of changes in these parameters. This simulation visualizes the motion of two pendulums under gravity and possibly air resistance. The key purpose is to demonstrate the behavior of pendulums, including the forces acting on them, the energy transformation, and how different parameters like length, mass, and air resistance affect their motion.",
    Red_Ball="Red Ball",
    Blue_Ball="Blue Ball",
    Controls="Controls",
    Options="Options",
    Values="Values",
    Timer="Timer",
    Add_Stopwatch="Add Stopwatch",
}

enum PendulumHindiLanguageEnums{
    Preferences='प्राथमिकता',
    Overview="अवलोकन",
    Languages="भाषाएं",
    Preference_Content="प्राथमिकताएँ आपको इस सिमुलेशन की भाषा बदलने की अनुमति देती हैं। तदनुसार सिमुलेशन का उपयोग करने के लिए अपनी पसंदीदा भाषा चुनें।",
    Information="जानकारी",
    Description="विवरण",
    Theory="सिद्धांत",
    Length1="लंबाई (लाल)",
    Length2 = "लंबाई (नीला)",
    Mass1 = "द्रव्यमान (लाल)",
    Mass2 = "द्रव्यमान (नीला)",
    Two_Pendulums_Toggle="दो पेंडुलम टॉगल",
    Description_Content="सिमुलेशन में एक आभासी पेंडुलम प्रणाली होगी जहां छात्र विभिन्न परिस्थितियों में एक या दो पेंडुलम की गति का निरीक्षण कर सकते हैं। सिमुलेशन में लंबाई, द्रव्यमान और वायु प्रतिरोध जैसे समायोज्य पैरामीटर शामिल होंगे, साथ ही बलों के दृश्य प्रतिनिधित्व, ऊर्जा वितरण और इन मापदंडों में परिवर्तन के प्रभाव शामिल होंगे। यह सिमुलेशन गुरुत्वाकर्षण और संभवतः वायु प्रतिरोध के तहत दो पेंडुलम की गति की कल्पना करता है। मुख्य उद्देश्य पेंडुलम के व्यवहार को प्रदर्शित करना है, जिसमें उन पर कार्य करने वाले बल, ऊर्जा परिवर्तन, और लंबाई, द्रव्यमान और वायु प्रतिरोध जैसे विभिन्न पैरामीटर उनकी गति को कैसे प्रभावित करते हैं।",
    Air_Resistance = "अवमंदन गुणांक",
    Free_Body_Diagram="मुक्त शरीर आरेख",
    Energy_Graph="ऊर्जा ग्राफ",
    Potential_Energy="संभावित ऊर्जा",
    Kinetic_Energy="गतिज ऊर्जा",
    Mechanical_Energy="यांत्रिक ऊर्जा",
    Red_Ball="लाल बॉल",
    Blue_Ball="नीली गेंद",
    Controls="नियंत्रण",
    Options="विकल्प",
    Values="मान",
    Timer="समय",
    Add_Stopwatch="स्टॉपवॉच जोड़ें",
}
interface LanguageParams {
    key: string;
    LanguageId: string;
}

export const getLanguageEnumByKeyForPendulumModel = ({ key, LanguageId }: LanguageParams): string => {
    if (LanguageId === 'hi') {
        return (PendulumHindiLanguageEnums as any)[key] || key;
    } else {
        return (PendulumEnglishLanguageEnums as any)[key] || key;
    }
};