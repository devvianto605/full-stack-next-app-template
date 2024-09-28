import { z } from "zod";
import bcrypt from "bcryptjs";
import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";

export const authRouter = createTRPCRouter({
  // Register route
  register: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(6),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Check if user already exists
      const existingUser = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      if (existingUser) {
        return {
          code: "CONFLICT",
          message: "User already exists",
        };
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(input.password, 10);

      // Create the new user
      const user = await ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashedPassword,
        },
      });

      return {
        status: "success",
        message: "User registered successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    }),

  // Sign-in route
  signin: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Check if user exists
      const user = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      if (!user) {
        return {
          code: "NOT_FOUND",
          message: "User not found",
        }
      }

      if (!user.password) {
        return {
          code: "NOT_FOUND",
          message: "Password not found",
        }
      }

      // Check if the password is correct
      const isPasswordCorrect = await bcrypt.compare(
        input.password,
        user.password
      );

      if (!isPasswordCorrect) {
        return {
          code: "UNAUTHORIZED",
          message: "Invalid password",
        };
      }

      // Generate session or token (for example purposes, we'll return the user)
      return {
        status: "success",
        message: "Signed in successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    }),
});
