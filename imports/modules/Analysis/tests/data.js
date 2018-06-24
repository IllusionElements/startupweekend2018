const lowerArray = arr => arr.map(t => t.toLowerCase());

export class Jobs {
  static teacher = lowerArray('Coaching,Collaboration,Communication,Childcare,Directing,Creating Assignments'
    .split(',')
    .concat(['Analysis', 'BSME', 'Building']));

  static nurse = lowerArray([
    'Clinical',
    'healthcare',
    'care',
    'selfless',
    'health',
    'certifications',
    'icu',
    'Equipment',
    'HVAC',
    'Manufacturing',
    'Mechanical',
  ]);

  static engineer = [
    'Analysis',
    'BSME',
    'Building',
    'CAD',
    'Design',
    'Development',
    'Drawings',
    'Electrical',
    'Engineering',
    'Equipment',
    'HVAC',
    'Manufacturing',
    'Mechanical',
    'Performance',
    'Product',
    'SolidWorks',
    'Systems',
    'Team',
    'Technical',
    'Testing',
  ].map(word => word.toLowerCase())
}

export const sampleKeywords = [
  'Analysis',
  'BSME',
  'Building',
  'CAD',
  'Design',
  'Development',
  'Drawings',
  'Electrical',
  'Engineering',
  'Equipment',
  'HVAC',
  'Manufacturing',
  'Mechanical',
  'Performance',
  'Product',
  'SolidWorks',
  'Systems',
  'Team',
  'Technical',
  'Testing',
].map(word => word.toLowerCase())
