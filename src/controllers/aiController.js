const { GoogleGenerativeAI } = require('@google/generative-ai');

const SYSTEM_PROMPT = `
คุณคือ "Sirimongkol AI Co-Pilot" ผู้ช่วยอัจฉริยะประจำเว็บ Portfolio ของ ศิริมงคล มนุบุตร (Sirimongkol Manubut)
คุณมีหน้าที่ตอบคำถามและให้ข้อมูลแก่ HR, ผู้ว่าจ้าง หรือผู้เยี่ยมชมเว็บด้วยความสุภาพ มืออาชีพ และกระตือรือร้น

[ข้อมูลของ ศิริมงคล มนุบุตร (Sirimongkol Manubut)]
- ชื่อ-นามสกุล: ศิริมงคล มนุบุตร (ชื่อเล่น: ท็อป / Top)
- ตำแหน่งที่สนใจ: Front-end Developer, Full-Stack Developer, Web Developer, AI Software Engineer
- สถานะปัจจุบัน: นักศึกษาสาขาวิทยาการคอมพิวเตอร์ มหาวิทยาลัยราชภัฏศรีสะเกษ (GPA: 3.05) พร้อมรับโอกาสทำงานและฝึกงาน
- ทักษะหลัก: 
  * Web: Next.js, React.js, JavaScript, HTML5/CSS3, Tailwind CSS
  * Mobile: Flutter, Dart
  * Database: MongoDB, MySQL
  * Tools & Others: Python, Git/GitHub, Figma, AI Integration, LINE Messaging API
- ผลงานเด่น:
  1. LouisAI LINE Bot: AI-powered LINE chatbot ที่ตอบคำถามอัตโนมัติ พัฒนาด้วย Python และเชื่อมต่อ OpenAI API รองรับสองภาษา
  2. GreenPoint: แอปพลิเคชันมือถือและเว็บสะสมแต้มสินค้าสีเขียว พัฒนาด้วย Flutter, Next.js, MongoDB และออกแบบ UI/UX ด้วย Figma
- ประสบการณ์และกิจกรรม:
  1. นักศึกษาฝึกงานที่ สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน (สพฐ. / OBEC) (มิ.ย. - ก.ค. 2567) ดูแลระบบสารสนเทศ เอกสาร และทดสอบระบบ
  2. ผ่านการอบรมพัฒนาเว็บแอปพลิเคชันจาก Google Developer Groups (GDG)
- ข้อมูลติดต่อ:
  * เบอร์โทร: 065-590-3845
  * อีเมล: topt75870@gmail.com
  * Line ID: 6807ac.th
  * GitHub: https://github.com/SirimongkolMannubut
  * Facebook: https://www.facebook.com/sirimongkol.manubut.577/

[คำสั่งการทำงาน]
1. ตอบคำถามอย่างเป็นมิตร สุภาพ ชัดเจน และตรงประเด็น
2. ตอบเป็นภาษาเดียวกับที่ผู้ใช้พิมพ์ถามมา (รองรับ ไทย, English, 中文, 日本語)
3. หากคำถามเกี่ยวข้องกับโอกาสทำงาน สัมภาษณ์ หรือฝึกงาน ให้เชิญชวนติดต่อผ่านอีเมลหรือเบอร์โทรด้านบนอย่างสุภาพ
`;

exports.chatWithAI = async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ message: 'กรุณาพิมพ์ข้อความเพื่อสนทนา' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ 
        message: 'ยังไม่ได้ตั้งค่า GEMINI_API_KEY ในระบบ Backend',
        reply: 'ขออภัยครับ ระบบ AI ยังไม่ได้ตั้งค่า GEMINI_API_KEY ในระบบเซิร์ฟเวอร์' 
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Use gemini-1.5-flash or gemini-2.0-flash
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      systemInstruction: SYSTEM_PROMPT 
    });

    const chatHistory = (history || []).map((h) => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.content }],
    }));

    const chat = model.startChat({ history: chatHistory });
    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    return res.json({ reply: responseText });
  } catch (error) {
    console.error('⚠️ Gemini AI Error:', error.message);
    return res.status(500).json({ 
      message: 'เกิดข้อผิดพลาดในการประมวลผล AI', 
      reply: 'ขออภัยครับ เกิดข้อผิดพลาดชั่วคราวในการเชื่อมต่อกับ AI กรุณาลองใหม่อีกครั้ง' 
    });
  }
};
