const { z } = require('zod');

const responseSchema = z
  .object({
    ip: z.string().ip(),
    country: z.string().min(1),
    country_code: z
      .string()
      .length(2)
      .regex(/^[A-Z]{2}$/),
    city: z.string().min(1),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    isp: z.string().min(1),
    threat_level: z.string().optional(),
  })
  .passthrough();

module.exports = {
  responseSchema,
};
