import z from 'zod';

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Title must be a string',
    required_error: 'Title is required'
  }),
  year: z.number().int().min(1888).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({ message: 'Poster must be a valid URL' }).endsWith('.jpg'),
  genre: z.array(z.enum(
    ['Action',
      'Adventure',
      'Animation',
      'Biography',
      'Comedy',
      'Crime',
      'Documentary',
      'Drama',
      'Family',
      'Fantasy',
      'Film Noir',
      'History',
      'Horror',
      'Music',
      'Musical',
      'Mystery',
      'Romance',
      'Sci-Fi',
      'Short Film',
      'Sport',
      'Superhero',
      'Thriller',
      'War',
      'Western'
    ],
    {
      required_error: 'Movie genre is required',
      invalid_type_error: 'Movie genre must be an array of enum Genre'
    }))
});

export function validateMovie (object) {
  return movieSchema.safeParse(object);
}

export function validatePartialMovie (input) {
  return movieSchema.partial().safeParse(input);
}
