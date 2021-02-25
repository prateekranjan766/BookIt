const books = [
  {
    title: 'The Complete Novels of Sherlock Holmes',
    rating: 4.5,
    author: ['Arthur Conan Doyle'],
    description:
      '“There’s the scarlet thread of murder running through the colourless skein of life and our duty is to unravel it and isolate it and expose every inch of it.”Sherlock Holmes Consulting Detective 221B Baker Street London. This is where begins a historical partnership between Dr. Watson—the archetypal gentleman from the Victorian era—and the eccentric, legendary sleuth, Sherlock Holmes. Join them as they gather clues, ranging from bloodstains and footprints to cigarette ash and wedding rings and arrive at unusual and surprising conclusions. This book is a collection of the four novels written by Sir Arthur Conan Doyle: A Study in Scarlet (1887), The Sign of the Four (1890), The Hound of the Baskervilles (1902) and The Valley of Fear (1915). Featuring the timeless detective Sherlock Holmes, these novels have been successfully engrossing readers for more than a century now.',
    countInStock: 15,
    category: 'novels',
    genre: 'fiction',
    mrp: 250,
    discount: 40, //in percent
    image: '/images/sherlock_holmes.jpg',
    numReviews: 5888,
    language: 'English',
    dimensions: {
      length: 20,
      breadth: 14,
      height: 4,
    },
    numOfPages: 536,
    weight: 320, //in grams
  },
  {
    title: 'One Arranged Murder',
    rating: 4.0,
    author: ['Chetan Bhagat'],
    description:
      'Keshav has set up an investigation agency with his best friend, Saurabh. Can the two amateur detectives successfully solve another murder case that affects them personally? And where will it leave their friendship? ‘Ever since you found Prerna, I lost my best friend’ is what I told Saurabh. Hi, this is Keshav, and Saurabh, my best friend, flatmate, colleague and business partner, won’t talk to me. Because I made fun of him and his fiancée. Saurabh and Prerna will be getting married soon. It is an arranged marriage. However, there is more cheesy romance between them than any love-marriage couple. On Karva Chauth, she fasted for him. She didn’t eat all day. In the evening, she called him and waited on the terrace for the moon and for Saurabh to break her fast. Excited, Saurabh ran up the steps of her three-storey house. But when he reached … Welcome to One Arranged Murder, an unputdownable thriller from India’s highest-selling author. A story about love, friendship, family and crime, it will keep you entertained and hooked right till the end.',
    countInStock: 5,
    category: 'novels',
    genre: 'fiction',
    mrp: 225,
    discount: 48, //in percent
    image: '/images/one-arranged-murder.jpeg',
    numReviews: 1186,
    language: 'English',
    dimensions: {
      length: 19.81,
      breadth: 12.95,
      height: 2.54,
    },
    numOfPages: 312,
    weight: 295, //in grams
  },
  {
    title: 'The Alchemist',
    rating: 4.3,
    author: ['Paulo Coelho'],
    description:
      'Santiago, an Andalusian shepherd boy, looks to travel the world in the quest to find a worldly treasure, unlike any others. Santiago’s quest takes him to the magical desert of Egypt, where he meets the alchemist. Is the alchemist what Santiago was looking for, or is he there to stop Santiago from fulfilling his quest? Well, you’ll have to read The Alchemist to find out.',
    countInStock: 5,
    category: 'novels',
    genre: 'fiction',
    mrp: 350,
    discount: 46, //in percent
    image: '/images/the_alchemist.jpeg',
    numReviews: 45987,
    language: 'English',
    dimensions: {
      length: 19.8,
      breadth: 12.9,
      height: 1.5,
    },
    numOfPages: 172,
    weight: 295, //in grams
  },
  {
    title: 'The Blue Umbrella',
    rating: 4.1,
    author: ['Ruskin Bond'],
    description:
      "'The Umbrella was like a flower, a great blue flower that had sprung up on the dry brown hillside.' In exchange for her lucky leopard's claw pendant, Binya acquires a beautiful blue umbrella that makes her the envy of everyone in her village, especially Ram Bharosa, the shop-keeper. Ruskin Bond's short and humorous novella, set in the picturesque hills of Garhwal, perfectly captures life in a village, where both heroism and redemption can be found.",
    countInStock: 8,
    category: 'novels',
    genre: 'fiction',
    mrp: 95,
    discount: 20, //in percent
    image: '/images/the_blue_umbrella.jpg',
    numReviews: 2945,
    language: 'English',
    dimensions: {
      length: 17.78,
      breadth: 11.1,
      height: 0.48,
    },
    numOfPages: 90,
    weight: 72.6, //in grams
  },
  {
    title: 'Marvel Spider-Man Adventures of the Web-Slinger',
    rating: 4.8,
    author: ['Simon Hugo', 'DK'],
    description:
      'Meet Peter Parker and learn all about his incredible transformation from high school student to Super Hero. Read about his awesome suit, the friends he can rely on to help him and the terrible foes, like the Green Goblin, that he must face. Can Peter keep his city and his secret identity safe? Engaging topics and fun, interactive pages build reading skills in this Level 4 Reader - just right for children who can read alone. A fun quiz at the end of the book helps to develop reading comprehension skills. Each title in the DK Readers series is developed in consultation with leading literacy experts to help children build a lifelong love of reading',
    countInStock: 13,
    category: 'comics',
    genre: 'fiction',
    mrp: 250,
    discount: 0, //in percent
    image: '/images/spider-man.jpg',
    numReviews: 41,
    language: 'English',
    dimensions: {
      length: 20.7,
      breadth: 13.5,
      height: 1.3,
    },
    numOfPages: 96,
    weight: 72.6, //in grams
  },
  {
    title: 'Batman: Detective Comics Vol. 3: League of Shadows (Rebirth)',
    rating: 4.8,
    author: ['James IV Tynion'],
    description:
      'The sweeping new chapter in writer James Tynion IV’s acclaimed saga—featuring a league of talented artists including Marcio Takara (THE FLASH) and Christian Duce (BATMAN AND ROBIN ETERNAL)—is here, in BATMAN: DETECTIVE COMICS VOL. 3: LEAGUE OF SHADOWS. Batwoman, an accomplished crime-fighter who’s overcome the darkest of betrayals. Clayface, a reformed villain whose potential is eclipsed only by his astonishing powers. New heroes like Azrael, an avenging angel, and Batwing, whose incredible armor makes him a true dark knight. Led by the Batman himself, this team of guardians stands ready to protect Gotham City. But the secrets of the team’s most mysterious member, Cassandra Cain, are about to come to light. And that light will cast a shadow darker than anything they’ve ever seen before. They thought the League of Shadows was just a rumor—a secret society of nihilistic killers often whispered about but never seen. But now the League is here, in Gotham. They’re destroying Batman’s team one by one. And their sinister leader, Lady Shiva, has come to reclaim her daughter—or destroy her. Can even Batman’s arch-enemy Ra’s al Ghul and his League of Assassins stop the onslaught? Or have the Shadows come to stay? Find out in BATMAN: DETECTIVE COMICS VOL. 3: LEAGUE OF SHADOWS.',
    countInStock: 3,
    category: 'comics',
    genre: 'fiction',
    mrp: 1350,
    discount: 33, //in percent
    image: '/images/batman.jpg',
    numReviews: 101,
    language: 'English',
    dimensions: {
      length: 25.91,
      breadth: 16.76,
      height: 0.76,
    },
    numOfPages: 184,
    weight: 333, //in grams
  },
  {
    title: 'The Diary of A Young Girl',
    rating: 4.5,
    author: ['Anne Frank'],
    description:
      'Fingerprint! Pocket Classics are perfect pocket-sized editions with complete original content. Anne Frank’s diary needs no introduction. This beautifully written memoir of a young girl caught in the middle of one of the most horrific periods of human history, is a testament to the indestructible human will to persevere and survive in the face of the most adverse of circumstances. Where Anne Frank herself became one of the victims of the Second World War, her words, crowding every available inch of space in her diary, survived to keep her story and her memory alive for the rest of the world through the ages...',
    countInStock: 7,
    category: 'biography',
    genre: '',
    mrp: 150,
    discount: 34, //in percent
    image: '/images/the_diary_of_a_young_girl.jpg',
    numReviews: 8654,
    language: 'English',
    dimensions: {
      length: 20,
      breadth: 14,
      height: 4,
    },
    numOfPages: 432,
    weight: 204, //in grams
  },
  {
    title: 'Cracking the Coding Interview (Indian Edition)',
    rating: 4.2,
    author: ['Gayle Laakmann McDowell'],
    description:
      'Gayle laakmann McDowell is the founder and CEO of careercup and the author of cracking the PM interview and cracking the tech career. Her background is in software development. She has worked as a software engineer at Google, Microsoft, and Apple. At Google, she interviewed hundreds of software engineers and evaluated thousands of hiring packets on the hiring Committee. She holds a B.S.E. And M.S.E. In computer science from the University of Pennsylvania and an MBA from the Wharton school. She now consults with tech companies to improve their hiring process and with start-ups to prepare them for acquisition interviews.',
    countInStock: 7,
    category: 'educational',
    genre: '',
    mrp: 590,
    discount: 0, //in percent
    image: '/images/cracking_the_coding_interview.jpg',
    numReviews: 488,
    language: 'English',
    dimensions: {
      length: 20,
      breadth: 14,
      height: 4,
    },
    numOfPages: 542,
    weight: 860, //in grams
  },
  {
    title: 'The Complete Novels of Sherlock Holmes',
    rating: 4.5,
    author: ['Arthur Conan Doyle'],
    description:
      '“There’s the scarlet thread of murder running through the colourless skein of life and our duty is to unravel it and isolate it and expose every inch of it.”Sherlock Holmes Consulting Detective 221B Baker Street London. This is where begins a historical partnership between Dr. Watson—the archetypal gentleman from the Victorian era—and the eccentric, legendary sleuth, Sherlock Holmes. Join them as they gather clues, ranging from bloodstains and footprints to cigarette ash and wedding rings and arrive at unusual and surprising conclusions. This book is a collection of the four novels written by Sir Arthur Conan Doyle: A Study in Scarlet (1887), The Sign of the Four (1890), The Hound of the Baskervilles (1902) and The Valley of Fear (1915). Featuring the timeless detective Sherlock Holmes, these novels have been successfully engrossing readers for more than a century now.',
    countInStock: 15,
    category: 'novels',
    genre: 'fiction',
    mrp: 250,
    discount: 40, //in percent
    image: '/images/sherlock_holmes.jpg',
    numReviews: 5888,
    language: 'English',
    dimensions: {
      length: 20,
      breadth: 14,
      height: 4,
    },
    numOfPages: 536,
    weight: 320, //in grams
  },
  {
    title: 'One Arranged Murder',
    rating: 4.0,
    author: ['Chetan Bhagat'],
    description:
      'Keshav has set up an investigation agency with his best friend, Saurabh. Can the two amateur detectives successfully solve another murder case that affects them personally? And where will it leave their friendship? ‘Ever since you found Prerna, I lost my best friend’ is what I told Saurabh. Hi, this is Keshav, and Saurabh, my best friend, flatmate, colleague and business partner, won’t talk to me. Because I made fun of him and his fiancée. Saurabh and Prerna will be getting married soon. It is an arranged marriage. However, there is more cheesy romance between them than any love-marriage couple. On Karva Chauth, she fasted for him. She didn’t eat all day. In the evening, she called him and waited on the terrace for the moon and for Saurabh to break her fast. Excited, Saurabh ran up the steps of her three-storey house. But when he reached … Welcome to One Arranged Murder, an unputdownable thriller from India’s highest-selling author. A story about love, friendship, family and crime, it will keep you entertained and hooked right till the end.',
    countInStock: 5,
    category: 'novels',
    genre: 'fiction',
    mrp: 225,
    discount: 48, //in percent
    image: '/images/one-arranged-murder.jpeg',
    numReviews: 1186,
    language: 'English',
    dimensions: {
      length: 19.81,
      breadth: 12.95,
      height: 2.54,
    },
    numOfPages: 312,
    weight: 295, //in grams
  },
  {
    title: 'The Alchemist',
    rating: 4.3,
    author: ['Paulo Coelho'],
    description:
      'Santiago, an Andalusian shepherd boy, looks to travel the world in the quest to find a worldly treasure, unlike any others. Santiago’s quest takes him to the magical desert of Egypt, where he meets the alchemist. Is the alchemist what Santiago was looking for, or is he there to stop Santiago from fulfilling his quest? Well, you’ll have to read The Alchemist to find out.',
    countInStock: 5,
    category: 'novels',
    genre: 'fiction',
    mrp: 350,
    discount: 46, //in percent
    image: '/images/the_alchemist.jpeg',
    numReviews: 45987,
    language: 'English',
    dimensions: {
      length: 19.8,
      breadth: 12.9,
      height: 1.5,
    },
    numOfPages: 172,
    weight: 295, //in grams
  },
  {
    title: 'The Blue Umbrella',
    rating: 4.1,
    author: ['Ruskin Bond'],
    description:
      "'The Umbrella was like a flower, a great blue flower that had sprung up on the dry brown hillside.' In exchange for her lucky leopard's claw pendant, Binya acquires a beautiful blue umbrella that makes her the envy of everyone in her village, especially Ram Bharosa, the shop-keeper. Ruskin Bond's short and humorous novella, set in the picturesque hills of Garhwal, perfectly captures life in a village, where both heroism and redemption can be found.",
    countInStock: 8,
    category: 'novels',
    genre: 'fiction',
    mrp: 95,
    discount: 20, //in percent
    image: '/images/the_blue_umbrella.jpg',
    numReviews: 2945,
    language: 'English',
    dimensions: {
      length: 17.78,
      breadth: 11.1,
      height: 0.48,
    },
    numOfPages: 90,
    weight: 72.6, //in grams
  },
  {
    title: 'Marvel Spider-Man Adventures of the Web-Slinger',
    rating: 4.8,
    author: ['Simon Hugo', 'DK'],
    description:
      'Meet Peter Parker and learn all about his incredible transformation from high school student to Super Hero. Read about his awesome suit, the friends he can rely on to help him and the terrible foes, like the Green Goblin, that he must face. Can Peter keep his city and his secret identity safe? Engaging topics and fun, interactive pages build reading skills in this Level 4 Reader - just right for children who can read alone. A fun quiz at the end of the book helps to develop reading comprehension skills. Each title in the DK Readers series is developed in consultation with leading literacy experts to help children build a lifelong love of reading',
    countInStock: 13,
    category: 'comics',
    genre: 'fiction',
    mrp: 250,
    discount: 0, //in percent
    image: '/images/spider-man.jpg',
    numReviews: 41,
    language: 'English',
    dimensions: {
      length: 20.7,
      breadth: 13.5,
      height: 1.3,
    },
    numOfPages: 96,
    weight: 72.6, //in grams
  },
  {
    title: 'Batman: Detective Comics Vol. 3: League of Shadows (Rebirth)',
    rating: 4.8,
    author: ['James IV Tynion'],
    description:
      'The sweeping new chapter in writer James Tynion IV’s acclaimed saga—featuring a league of talented artists including Marcio Takara (THE FLASH) and Christian Duce (BATMAN AND ROBIN ETERNAL)—is here, in BATMAN: DETECTIVE COMICS VOL. 3: LEAGUE OF SHADOWS. Batwoman, an accomplished crime-fighter who’s overcome the darkest of betrayals. Clayface, a reformed villain whose potential is eclipsed only by his astonishing powers. New heroes like Azrael, an avenging angel, and Batwing, whose incredible armor makes him a true dark knight. Led by the Batman himself, this team of guardians stands ready to protect Gotham City. But the secrets of the team’s most mysterious member, Cassandra Cain, are about to come to light. And that light will cast a shadow darker than anything they’ve ever seen before. They thought the League of Shadows was just a rumor—a secret society of nihilistic killers often whispered about but never seen. But now the League is here, in Gotham. They’re destroying Batman’s team one by one. And their sinister leader, Lady Shiva, has come to reclaim her daughter—or destroy her. Can even Batman’s arch-enemy Ra’s al Ghul and his League of Assassins stop the onslaught? Or have the Shadows come to stay? Find out in BATMAN: DETECTIVE COMICS VOL. 3: LEAGUE OF SHADOWS.',
    countInStock: 3,
    category: 'comics',
    genre: 'fiction',
    mrp: 1350,
    discount: 33, //in percent
    image: '/images/batman.jpg',
    numReviews: 101,
    language: 'English',
    dimensions: {
      length: 25.91,
      breadth: 16.76,
      height: 0.76,
    },
    numOfPages: 184,
    weight: 333, //in grams
  },
  {
    title: 'The Diary of A Young Girl',
    rating: 4.5,
    author: ['Anne Frank'],
    description:
      'Fingerprint! Pocket Classics are perfect pocket-sized editions with complete original content. Anne Frank’s diary needs no introduction. This beautifully written memoir of a young girl caught in the middle of one of the most horrific periods of human history, is a testament to the indestructible human will to persevere and survive in the face of the most adverse of circumstances. Where Anne Frank herself became one of the victims of the Second World War, her words, crowding every available inch of space in her diary, survived to keep her story and her memory alive for the rest of the world through the ages...',
    countInStock: 7,
    category: 'biography',
    genre: '',
    mrp: 150,
    discount: 34, //in percent
    image: '/images/the_diary_of_a_young_girl.jpg',
    numReviews: 8654,
    language: 'English',
    dimensions: {
      length: 20,
      breadth: 14,
      height: 4,
    },
    numOfPages: 432,
    weight: 204, //in grams
  },
  {
    title: 'Cracking the Coding Interview (Indian Edition)',
    rating: 4.2,
    author: ['Gayle Laakmann McDowell'],
    description:
      'Gayle laakmann McDowell is the founder and CEO of careercup and the author of cracking the PM interview and cracking the tech career. Her background is in software development. She has worked as a software engineer at Google, Microsoft, and Apple. At Google, she interviewed hundreds of software engineers and evaluated thousands of hiring packets on the hiring Committee. She holds a B.S.E. And M.S.E. In computer science from the University of Pennsylvania and an MBA from the Wharton school. She now consults with tech companies to improve their hiring process and with start-ups to prepare them for acquisition interviews.',
    countInStock: 7,
    category: 'educational',
    genre: '',
    mrp: 590,
    discount: 0, //in percent
    image: '/images/cracking_the_coding_interview.jpg',
    numReviews: 488,
    language: 'English',
    dimensions: {
      length: 20,
      breadth: 14,
      height: 4,
    },
    numOfPages: 542,
    weight: 860, //in grams
  },
];

export default books;
