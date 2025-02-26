import { AppRoutes } from "../routes/AppRoutes";
import { Container } from "./container/Container";

export const Layout = () => {
  return (
    <Container>
        <AppRoutes />
    </Container>
  );
};
