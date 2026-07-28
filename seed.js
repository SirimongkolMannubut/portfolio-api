require('dotenv').config();
const mongoose    = require('mongoose');
const Profile     = require('./src/models/Profile');
const Project     = require('./src/models/Project');
const Skill       = require('./src/models/Skill');
const Activity    = require('./src/models/Activity');
const Certificate = require('./src/models/Certificate');
const Contact     = require('./src/models/Contact');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');

  // Clear existing data
  await Promise.all([
    Profile.deleteMany({}),
    Project.deleteMany({}),
    Skill.deleteMany({}),
    Activity.deleteMany({}),
    Certificate.deleteMany({}),
    Contact.deleteMany({}),
  ]);
  console.log('🗑️  Cleared existing data');

  // Profile
  await Profile.create({
    name:         'ศิริมงคล มนุบุตร',
    title:        'Front-end Developer · Web Developer',
    bio:          'นักศึกษาสาขาวิทยาการคอมพิวเตอร์ที่มุ่งมั่นในการพัฒนา Web Application และเทคโนโลยี AI มีประสบการณ์ในการพัฒนาระบบ Full-Stack ทั้งฝั่ง Front-end และ Back-end รวมถึงการออกแบบฐานข้อมูลและการประยุกต์ใช้ AI ในงานจริง พร้อมเปิดรับความรู้และความท้าทายใหม่ ๆ เพื่อพัฒนาศักยภาพในการเป็น Software Developer ในอนาคต',
    profileImage: '',
    gpa:          3.05,
    university:   'มหาวิทยาลัยราชภัฏ ศรีสะเกษ',
    faculty:      'วิทยาการคอมพิวเตอร์',
  });
  console.log('✅ Profile seeded');

  // Projects
  await Project.insertMany([
    {
      title:       'LouisAI LINE Bot',
      description: 'AI-powered LINE chatbot ที่ตอบคำถามอัตโนมัติ พัฒนาด้วย Python และเชื่อมต่อ OpenAI API รองรับการสนทนาเป็นภาษาไทยและอังกฤษ',
      techStack:   ['Python', 'LINE Messaging API', 'OpenAI API', 'Flask'],
      githubUrl:   'https://github.com/SirimongkolMannubut',
      figmaUrl:    '',
      liveUrl:     '',
      imageUrl:    '',
      order:       1,
      isActive:    true,
    },
    {
      title:       'GreenPoint',
      description: 'แอปพลิเคชันมือถือและเว็บสำหรับสะสมแต้มสินค้าสีเขียว รองรับการสแกน QR Code รับแต้มจริง ระบบแผนที่พาร์ทเนอร์ และจัดการรูปโปรไฟล์ พัฒนาร่วมกับทีม รับผิดชอบส่วน Mobile App และออกแบบ UI/UX ด้วย Figma',
      techStack:   ['Flutter', 'Next.js', 'MongoDB', 'Figma'],
      githubUrl:   'https://github.com/SirimongkolMannubut',
      figmaUrl:    'https://www.figma.com/design/n7MeR6y12E3TSJlikgy8FG/GREEN_POINT_FOR_EVER?node-id=1100-1367&t=DjY83an2h8plSZme-0',
      liveUrl:     '',
      imageUrl:    '',
      order:       2,
      isActive:    true,
    },
  ]);
  console.log('✅ Projects seeded');

  // Skills
  await Skill.insertMany([
    { name: 'Next.js',    level: 75, category: 'Web',      order: 1 },
    { name: 'React',      level: 70, category: 'Web',      order: 2 },
    { name: 'JavaScript', level: 75, category: 'Web',      order: 3 },
    { name: 'HTML/CSS',   level: 85, category: 'Web',      order: 4 },
    { name: 'Flutter',    level: 70, category: 'Mobile',   order: 1 },
    { name: 'Dart',       level: 65, category: 'Mobile',   order: 2 },
    { name: 'MySQL',      level: 70, category: 'Database', order: 1 },
    { name: 'MongoDB',    level: 65, category: 'Database', order: 2 },
    { name: 'Python',     level: 65, category: 'Tools',    order: 1 },
    { name: 'Git/GitHub', level: 75, category: 'Tools',    order: 2 },
    { name: 'Figma',      level: 70, category: 'Tools',    order: 3 },
    { name: 'AI Tools',   level: 70, category: 'Tools',    order: 4 },
  ]);
  console.log('✅ Skills seeded');

  // Certificates
  await Certificate.insertMany([
    {
      title:         'Web Development & Next.js Professional',
      issuer:        'Google Developer Groups (GDG)',
      issueDate:     '2023',
      credentialUrl: '',
      imageUrl:      '',
      order:         1,
      isActive:      true,
    },
    {
      title:         'Full-Stack Web & Mobile Application Certificate',
      issuer:        'มหาวิทยาลัยราชภัฏ ศรีสะเกษ',
      issueDate:     '2024',
      credentialUrl: '',
      imageUrl:      '',
      order:         2,
      isActive:      true,
    }
  ]);
  console.log('✅ Certificates seeded');

  // Activities
  await Activity.insertMany([
    {
      title:        'นักศึกษาฝึกงาน',
      organization: 'สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน (สพฐ.)',
      period:       'มิ.ย. - ก.ค. 2567',
      description:  [
        'พัฒนาและดูแลระบบสารสนเทศภายในองค์กร',
        'ทำงานร่วมกับทีม IT ในการแก้ปัญหาเทคนิค',
        'จัดทำเอกสารและคู่มือการใช้งานระบบ',
      ],
      type:  'internship',
      order: 1,
    },
    {
      title:        'Google Developer Groups (GDG) Training',
      organization: 'Google Developer Groups',
      period:       '2566',
      description:  [
        'การพัฒนาเว็บไซต์ด้วย HTML, CSS และ JavaScript',
        'การพัฒนาเว็บแอปพลิเคชันด้วย Next.js และ React.js',
        'พื้นฐานการออกแบบ UI/UX สำหรับ Web Application',
      ],
      type:  'training',
      order: 2,
    },
  ]);
  console.log('✅ Activities seeded');

  // Contact
  await Contact.create({
    phone:    '065-590-3845',
    email:    'topt75870@gmail.com',
    lineId:   '6807ac.th',
    github:   'https://github.com/SirimongkolMannubut',
    facebook: 'https://www.facebook.com/sirimongkol.manubut.577/',
    figmaUrl: 'https://www.figma.com/design/n7MeR6y12E3TSJlikgy8FG/GREEN_POINT_FOR_EVER?node-id=1100-1367&t=DjY83an2h8plSZme-0',
  });
  console.log('✅ Contact seeded');

  console.log('\n🎉 All data seeded successfully!');
  await mongoose.disconnect();
}

seed().catch(console.error);
