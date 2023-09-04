import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import PageLayout from "examples/LayoutContainers/PageLayout";

function BasicLayout({ title, description, image, children }) {
  return (
    <PageLayout>
      <SoftBox
        width="calc(100% - 3rem)"
        minHeight="60vh"
        borderRadius="lg"
        mx="auto"
        my={2}
        pt={6}
        pb={28}
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            image &&
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
      </SoftBox>
      <SoftBox mt={{ xs: -26, lg: -35 }} mb={5} px={1} width="calc(100% - 2rem)" mx="auto">
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={11} sm={9} md={6} lg={6} xl={5}>
            {children}
          </Grid>
        </Grid>
      </SoftBox>
    </PageLayout>
  );
}

// Setting default values for the props of BasicLayout
BasicLayout.defaultProps = {
  title: "",
  description: "",
};

// Typechecking props for the BasicLayout
BasicLayout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
