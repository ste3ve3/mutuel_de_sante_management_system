// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useState, useEffect } from "react";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';  

import { getAllSponsors } from "store/actions/sponsor";
import { getAllUsers } from "store/actions/user";
import { connect } from 'react-redux';
import { useFetcher } from "apiFetch";
import UsersReport from "./components/UsersReport";
import SponsorsReport from "./components/SponsorsReport";

function Dashboard({users, getUsers, sponsors, getSponsors }) {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;

  const { data: allSponsors, isError: sponsorsError, isLoading: sponsorsLoading } = useFetcher('/sponsor');
  const { data: allUsers, isError: usersError, isLoading: usersLoading } = useFetcher('/person');

  useEffect(() => {
    if (allUsers?.data?.length) {
        getUsers({ users: allUsers?.data });
    }

    if (allSponsors?.data?.length) {
      getSponsors({ sponsors: allSponsors?.data });
    }
}, [allUsers?.data?.length, allSponsors?.data?.length]);

const usersWithSponsors = users?.filter((user) => user?.hasSponsor)
const usersWithoutSponsors = users?.filter((user) => !user?.hasSponsor)

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={6}>
              <MiniStatisticsCard
                title={{ text: "All Underprivileged People" }}
                count={users?.length}
                icon={{ color: "info", component: "people_outline" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={6}>
              <MiniStatisticsCard
                title={{ text: "Available Sponsors" }}
                count={sponsors?.length}
                icon={{ color: "info", component: "volunteer_activism" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={6}>
              <MiniStatisticsCard
                title={{ text: "The Underprivileged with Sponsors" }}
                count={usersWithSponsors?.length}
                icon={{
                  color: "info",
                  component: "people_outline",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={6}>
              <MiniStatisticsCard
                title={{ text: "The Underprivileged Without Sponsors" }}
                count={usersWithoutSponsors?.length}
                icon={{
                  color: "info",
                  component: "people_outline",
                }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <UsersReport />
          </Grid>
          <Grid item xs={10}>
            <SponsorsReport />
          </Grid>
        </Grid>
      </SoftBox>
    </DashboardLayout>
  );
}

const mapStateToProps = (state) => ({
  users: state.user.users,
  sponsors: state.sponsor.sponsors,
});

const mapDispatchToProps = (dispatch) => {
  return {
      getUsers: (data) => dispatch(getAllUsers(data)),
      getSponsors: (data) => dispatch(getAllSponsors(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
