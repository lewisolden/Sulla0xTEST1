import { z } from "zod";

export interface ModuleTopic {
  id: string;
  title: string;
  path: string;
  subsections: string[];
}

export const moduleTopics: ModuleTopic[] = [
  {
    id: 'digital-currencies',
    title: 'Introduction to Digital Currencies',
    path: '/modules/module1/digital-currencies',
    subsections: [
      'What are digital currencies?',
      'Types of digital currencies',
      'Key features and benefits',
      'Real-world applications'
    ]
  },
  {
    id: 'money-evolution',
    title: 'History and Evolution of Money',
    path: '/modules/module1/history-of-money',
    subsections: [
      'Traditional money systems',
      'Digital transformation of money',
      'The rise of cryptocurrencies',
      'Future of money'
    ]
  }
];
