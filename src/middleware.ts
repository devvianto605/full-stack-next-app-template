/* eslint-disable complexity */
import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { ROUTES } from '@/routes';
import { defaultLocale, localePrefix, locales } from '@/libs/next-intl';
import createIntlMiddleware from 'next-intl/middleware';


const localeValidator = (locale: 'en' | 'th') => {
  return locales.includes(locale);
};

function middleware(intlMiddleware: NextMiddleware) {
  return async (req: NextRequest, event: NextFetchEvent) => {
    const token = await getToken({ req });

    // Check whether the locale is invalid or missing. if true, set default locale to the path.
    const [, locale] = req.nextUrl.pathname.split('/');
    const isLocale = localeValidator(locale as 'th' | 'en');
    const validatedLocale = isLocale ? `/${locale}` : `'/${defaultLocale}`;

    const isProtectRoute =
      req.nextUrl.pathname.startsWith(
        `${validatedLocale}${ROUTES.DASHBOARD}`
        // ||
        // ... add protected routes
      )

    const isAuthRoute =
      req.nextUrl.pathname.startsWith(
        `${validatedLocale}${ROUTES.LOGIN}`
        ||
        `${validatedLocale}${ROUTES.REGISTRATION}`,
      )

    // If comes as protected route and token !== null let it through, otherwise redirect to login
    if (isProtectRoute) {
      if (token !== null) {
        return await intlMiddleware(req, event);
      }

      const url = new URL(
        `${validatedLocale}${ROUTES.LOGIN}`,
        req.url,
      );

      return NextResponse.redirect(url);
    }

    // If comes as auth route and token === null let it through, otherwise redirect to dashboard
    if (isAuthRoute) {
      if (token === null) {
        return await intlMiddleware(req, event);
      }

      const url = new URL(
        `${validatedLocale}${ROUTES.DASHBOARD}`,
        req.url,
      );

      return NextResponse.redirect(url);
  }

  return await intlMiddleware(req, event);
};
}

export const config = {
  matcher: ['/', '/(th|en)/:path*'],
};

export default middleware(
  createIntlMiddleware({
    defaultLocale,
    locales,
    localePrefix,
  }),
);


