import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

import { LocaleNameType } from "@/configs/languages";
import languageDetector from "@/utils/languageDetector";

interface LanguageSwitchLinkProps extends Partial<LinkProps> {
  locale: LocaleNameType;
  className?: string;
}

const LanguageSwitchLink = ({
  children,
  locale,
  ...props
}: PropsWithChildren<LanguageSwitchLinkProps>) => {
  const router = useRouter();

  let href = props.href || router.asPath;
  let pName = router.pathname;
  Object.keys(router.query).forEach((k) => {
    if (k === "locale") {
      pName = pName.replace(`[${k}]`, locale);
      return;
    }
    pName = pName.replace(`[${k}]`, router.query[k] as string);
  });
  if (locale) {
    href = props.href ? `/${locale}${props.href}` : pName;
  }

  return (
    <Link {...props} href={href} onClick={() => languageDetector.cache?.(locale)}>
      {children}
    </Link>
  );
};

export default LanguageSwitchLink;
