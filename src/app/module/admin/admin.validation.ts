import { z } from 'zod';

const createAdminZodSchema = z.object({
    body: z.object({
        phoneNumber: z.string({
            required_error: 'Name is required',
        }),
        password: z.string({
            required_error: 'Price is required',
        }),
        role: z.enum(['admin'], {
            required_error: 'Role is required',
        }),
        name: z.object({
            firstName: z.string({
                required_error: 'FirstName is required',
            }),
            lastName: z.string({
                required_error: 'lastName is required',
            }),
        }),
        address: z.string({
            required_error: 'Address is required',
        }),
    })
});


export const AdminValidation = {
    createAdminZodSchema
  };

