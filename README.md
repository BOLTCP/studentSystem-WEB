1. Аппликэйшны бүтэц

  Төслийн бүтэц нь модулиар хуваагдсан бөгөөд оюутан, багш, их сургуулийн тэнхим, болон хичээлүүдийн логикийг тус тусад нь ялгаж өгсөн.
  src/main.jsx файл дотор маршрутууд (routes) тодорхой заагдсан, үүний дагуу хуудас болон компонентуудын урсгалыг хялбархан харах боломжтой:
  / → Нэвтрэх дэлгэц (Login screen)
  /student_dashboard → Оюутны хяналтын самбар
  /teacher_dashboard → Багшийн хяналтын самбар
  /profile_screen, /major, /curriculum, /course_management, гэх мэт...

2. Гол Компонентууд
  Оюутны Компонентууд
  Байршил: src/component/student/
  student_dashboard.jsx — Оюутны үндсэн хяналтын самбар
  major/Major.jsx — Оюутны мэргэжлийн дэлгэц
  major/curriculum.jsx — Хөтөлбөрийн удирдлага
  Багшийн Компонентууд
  Байршил: src/component/teacher/
  teacher_dashboard.jsx — Багшийн үндсэн хяналтын самбар
  courseManagement/course_management.jsx — Хичээлийн удирдлагын хэрэгсэл
  🏛 Их Сургуулийн Компонентууд
  university/department_of_university.jsx
  university/majors.jsx

3. Модел ба Өгөгдөлтэй Харьцах
  Байршил: src/models/
  Энд мэргэжил (major), хичээл (course), материал, файл гэх мэт өгөгдлийн логик агуулсан классууд байрладаг.
  MajorClass (major.jsx):
  Мэргэжлийн шинж чанаруудыг агуулсан
  JSON хөрвүүлэлт (serialization/deserialization)
  Туслах функцүүд
  Жишээ функцүүд:
  fromJsonMajor(json) — Серверийн JSON хариуг объект болгоно
  toJson() — API-д илгээх JSON болгон хөрвүүлнэ
  toString() — Хүн ойлгохоор текст болгон буцаана
  Courses, CourseMaterial, CourseMaterialsFiles нь адил бүтэцтэй бөгөөд конструктор, сериализаци болон туслах функцүүдтэй.

4. Автомат Үүссэн Код
  src/generated/prisma/ хавтас дахь файлууд нь Prisma ORM-оор автоматаар үүсгэгдсэн бөгөөд гараар засварлах ёсгүй.
5. UI логик
  Sidebar болон чиглүүлэлтүүдийг student_major_side_bars.jsx зэрэг файлуудад удирдаж байгаа. Props болон React Router-ийн navigate функц ашиглан дэлгэц хооронд шилждэг.
6. Код бичих ур чадварууд

  Объект чиг баримжаатай программчлал (OOP):
  Үндсэн өгөгдлийн бүх объектууд классаар тодорхойлогдсон. Конструктор болон сериализаци методтой.

  Өгөгдлийн төрөлтэй харьцах:
  Огноо, бутархай тоо зэргийг зөв хөрвүүлж авч үздэг.
  
  Компонентын бүтэц:
  Оюутан, багш, их сургуулийн модуль тус бүрийн логик тусгаарлагдсан.
  
  Алдаа барих механизм (Error Handling):
  Try/catch блок ашиглан өгөгдөл хөрвүүлэлт ба API дуудлагуудад алдаа барина.
  
  Төлөв ба чиглүүлэлт (State & Navigation):
  React-ийн state, props, localStorage ашиглан мэдээллийг хадгалж, хэрэглэгчийн үйлдэлд хариу үйлдэл үзүүлдэг.



src/main.jsx
1. Application Structure
  The project is modular, separating logic for students, teachers, university departments, and courses.
  Routes are clearly defined in src/main.jsx, making it easy to see the page/component flow:
  / → Login screen
  /student_dashboard → Student dashboard
  /teacher_dashboard → Teacher dashboard
  /profile_screen, /major, /curriculum, /course_management, etc.
2. Key Components
  Student Components:
  Located in src/component/student/
  
  student_dashboard.jsx — Student main dashboard
  major/Major.jsx — Major view for student
  major/curriculum.jsx — Curriculum management
  Teacher Components:
  Located in src/component/teacher/
  
  teacher_dashboard.jsx — Teacher main dashboard
  courseManagement/course_management.jsx — Course management tools
  University Components:
  
  university/department_of_university.jsx
  university/majors.jsx
3. Models and Data Handling
  The logic for handling data entities like majors, courses, materials, and files are in src/models/
  MajorClass (major.jsx):
  Encapsulates the major’s properties, handles JSON serialization/deserialization, and provides utility methods.
  Example methods:
  fromJsonMajor(json): Parses a major from a backend JSON response.
  toJson(): Serializes a major for API requests.
  toString(): Human-readable summary for debugging/logging.
  Courses, CourseMaterial, CourseMaterialsFiles:
  Similar structure with constructor, static serialization, and utility methods.
4. Generated Code
  Files in src/generated/prisma/ are auto-generated by Prisma ORM and should not be edited directly.
5. UI Logic
  Sidebar and navigation are managed in files like student_major_side_bars.jsx, using props and React Router’s navigate for transitions.
6. Coding Skills Highlights
  OOP Practices:
  Classes for all main entities, with clear constructors and serialization methods.
  Type Handling:
  Careful parsing and conversion of data types (dates, floats, etc.) in models.
  Component Structure:
  Separation of concerns between student, teacher, and university modules.
  Error Handling:
  Try/catch blocks in model parsers and API calls.
  State and Navigation:
  Uses React state, props, and localStorage for persistence and navigation.
