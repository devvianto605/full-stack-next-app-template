import { redirect } from "@/libs/next-intl";
import { ROUTES } from "@/routes";

const HomePage = () => {
  redirect(ROUTES.DASHBOARD)
};

export default HomePage;
