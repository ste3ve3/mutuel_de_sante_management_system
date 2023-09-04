// @mui material components
import Card from "@mui/material/Card";
import { useState, useEffect } from "react";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import { Author } from "./data/authorsTableData";
import { RenderMenuWrapper } from "./data/authorsTableData";
import team2 from "assets/images/team-2.jpg";
import SoftBadge from "components/SoftBadge";
import DataWidget from "components/Global/DataWidget";
import { getAllUsers, addUser, deleteUser, editUser } from "store/actions/user";
import { connect } from 'react-redux';
import { useFetcher, API } from "apiFetch";
import Sidebar from 'components/Global/Sidebar';
import ChooseFileImage from 'components/Global/ChooseFileImage';
import { toast } from 'react-hot-toast';
import { compareObj } from "config/constant";
import SoftInput from "components/SoftInput";
import ModalDialog from "components/Global/ModalDialog";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const initFormData = {
  names: '',
  passportPhoto: '',
  phoneNumber: '',
  nationalId: '',
  residentCell: ''
};

const initState = { loading: false, error: null };

function Tables({ users, getUsers, addUser, editUser, deleteUser }) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openSponsorSidebar, setOpenSponsorSidebar] = useState(false);
    const [formData, setFormData] = useState(initFormData);
    const [state, setState] = useState(initState);
    const [currentUser, setCurrentUser] = useState(null);
    const [sponsorId, setSponsorId] = useState(null)

    const { data, isError, isLoading } = useFetcher('/person');
    const { data: allSponsors, isError: sponsorError, isLoading: sponsorLoading } = useFetcher('/sponsor');
    const { data: userSponsor, isError: userSponsorError, isLoading: userSponsorLoading } = useFetcher(`/person/viewSponsor?sponsorId=${currentUser?.sponsorId}`);

    useEffect(() => {
        if (data?.data?.length) {
            getUsers({ users: data?.data });
        }
    }, [data?.data?.length]);

    useEffect(() => {
        if (currentUser) {
            setFormData({
                names: currentUser.names,
                passportPhoto: currentUser.passportPhoto,
                phoneNumber: currentUser.phoneNumber,
                nationalId: currentUser.nationalId,
                residentCell: currentUser.residentCell,
            });
        } else {
            setFormData(initFormData);
        }
    }, [currentUser]);

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setState(initState);
        try {
            setState((prev) => ({ ...prev, loading: true }));
            if (currentUser) {
                const newObj = compareObj(currentUser, formData);
                if (!Object.keys(newObj).length) {
                    toast.error('No changes made', { position: 'top-center' });
                    return;
                }
                const result = await toast.promise(
                    API.patch(`/person?personId=${currentUser._id}`, newObj),
                    {
                        loading: `Updating person, please wait...`,
                        success: `Person updated successfully!`,
                        error: `Something went wrong while updating this person`
                    },
                    { position: 'top-center' }
                );
                editUser(result.data.data);
                setCurrentUser(null);
            } else {
                const result = await toast.promise(
                    API.post(`/person`, formData),
                    {
                        loading: `Adding person, please wait...`,
                        success: `Person added successfully!`,
                        error: `Something went wrong while adding this person`
                    },
                    { position: 'top-center' }
                );
                addUser(result.data.data);
            }
            setFormData(initFormData);
            setOpenSidebar(false);
        } catch (error) {
            setState((prev) => ({
                ...prev,
                error: error.response?.data?.message || error.message || 'Unknown error occured, please try again.'
            }));
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    };

    const handleSponsorSubmit = async () => {
        setState(initState);
        try {
            setState((prev) => ({ ...prev, loading: true }));
            const result = await toast.promise(
                API.patch(`/person/assignSponsor?personId=${currentUser._id}`, { sponsorId: sponsorId }),
                {
                    loading: `Assigning sponsor, please wait...`,
                    success: `Sponsor assigned successfully!`,
                    error: `Something went wrong while assigning this sponsor`
                },
                { position: 'top-center' }
            );
            editUser(result.data.data);
            setCurrentUser(null);
            setFormData(initFormData);
            setOpenSponsorSidebar(false);
        } catch (error) {
            setState((prev) => ({
                ...prev,
                error: error.response?.data?.message || error.message || 'Unknown error occured, please try again.'
            }));
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    };

    const handleOpenSponsorSidebar = () => {
        setOpenSponsorSidebar(true);
    };
    const handleCloseSponsorSidebar = () => {
        if (state.loading) return;
        setOpenSponsorSidebar(false);
        setCurrentUser(null);
        setState(initState);
    };
    const handleOpenSidebar = () => {
        setOpenSidebar(true);
    };
    const handleCloseSidebar = () => {
        if (state.loading) return;
        setOpenSidebar(false);
        setCurrentUser(null);
        setState(initState);
    };

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
        setCurrentUser(null);
    };

    const [openViewModal, setOpenViewModal] = useState(false);
    const handleOpenViewModal = () => {
        setOpenViewModal(true);
    };
    const handleCloseViewModal = () => {
        setOpenViewModal(false);
        setCurrentUser(null);
    };

    const authorsTableData = {
      columns: [
        { name: "person info", align: "left" },
        { name: "National ID Number", align: "left" },
        { name: "residental cell", align: "center" },
        { name: "has sponsor", align: "center" },
        { name: "action", align: "center" },
      ],
    
      rows: users?.map((user, index) => ({
        "person info": (
          <Author image={user?.passportPhoto} name={user?.names} email={user?.phoneNumber} />
        ),
        "National ID Number": (
          <SoftTypography variant="caption" color="secondary" fontWeight="bold" fontSize="small">
            {user?.nationalId}
          </SoftTypography>
        ),
        "residental cell": (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {user?.residentCell}
          </SoftTypography>
        ),
        "has sponsor": (
          <SoftBadge variant="gradient" badgeContent={user?.hasSponsor ? "true" : "false"} color={user?.hasSponsor ? "success" : "error"} size="xs" container />
        ),
        action: 
        <RenderMenuWrapper 
          key={index} 
          onEdit={() => {
            setCurrentUser(user);
            handleOpenSidebar();
          }}
          onDelete={() => {
            setCurrentUser(user)
            handleOpenModal()
          }}
          onAssign={() => {
            setCurrentUser(user);
            handleOpenSponsorSidebar();
          }}
          onView={() => {
            setCurrentUser(user);
            handleOpenViewModal();
          }}
          hasSponsor={user?.hasSponsor}
        />,
      })),
    }

  const { columns, rows } = authorsTableData;
 
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">The Underprivileged</SoftTypography>
              <Sidebar
                    title={currentUser ? 'Update Person' : 'Add New Person'}
                    openSidebar={openSidebar}
                    onOpenSidebar={() => {
                        setCurrentUser(null);
                        handleOpenSidebar();
                    }}
                    onCloseSidebar={handleCloseSidebar}
                    handleSubmit={handleSubmit}
                    state={state}
                >
                    <SoftInput
                        placeholder="Person Names"
                        type="text"
                        value={formData.names}
                        onChange={(e) => handleChange('names', e.target.value)}
                    />
                    <ChooseFileImage
                        selected={formData.passportPhoto}
                        title="Passport Photo"
                        onSelect={(selected) => handleChange('passportPhoto', selected)}
                    />
                    <SoftInput
                        placeholder="Phone Number"
                        type="number"
                        value={formData.phoneNumber}
                        onChange={(e) => handleChange('phoneNumber', e.target.value)}
                    />
                    <SoftInput
                        placeholder="National ID"
                        type="number"
                        value={formData.nationalId}
                        onChange={(e) => handleChange('nationalId', e.target.value)}
                    />
                    <SoftInput
                        placeholder="Resident Cell"
                        type="text"
                        value={formData.residentCell}
                        onChange={(e) => handleChange('residentCell', e.target.value)}
                    />
                </Sidebar>
                <Sidebar
                      title="Assign Sponsor"
                      hideButton
                      openSidebar={openSponsorSidebar}
                      onOpenSidebar={() => {
                          setCurrentUser(null);
                          handleOpenSponsorSidebar();
                      }}
                      onCloseSidebar={handleCloseSponsorSidebar}
                      handleSubmit={handleSponsorSubmit}
                      state={state}
                  >
                    <SoftBox px={3}>
                      <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label" sx={{ fontSize: 16, mb: 2 }}>Choose Sponsor</FormLabel>
                          <DataWidget
                            title="Underprivileged users"
                            isLoading={isLoading && !users.length}
                            isError={isError && !users.length}
                            isEmpty={!users.length}
                          >
                            <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"
                              name="radio-buttons-group"
                              value={sponsorId}
                              onChange={(event) => setSponsorId(event.target.value)}
                            >
                              {allSponsors?.data?.map((sponsor, index) => (
                                <FormControlLabel
                                  key={index}
                                  value={sponsor?._id}
                                  control={<Radio />}
                                  label={sponsor?.names}
                                />
                              ))}
                            </RadioGroup>
                          </DataWidget>
                        
                      </FormControl>
                    </SoftBox>
                  </Sidebar>
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <DataWidget
                title="Underprivileged users"
                isLoading={isLoading && !users.length}
                isError={isError && !users.length}
                isEmpty={!users.length}
              >
                <Table columns={columns} rows={rows} />
              </DataWidget>
            </SoftBox>
          </Card>
          <ModalDialog
                title="Delete Person?"
                subTitle={`Are you sure do you want to delete this person? `}
                item={currentUser?.names}
                open={openModal}
                cancelText="Cancel"
                showOkText
                handleClose={handleCloseModal}
                handleClickOk={async () => {
                    const id = currentUser?._id;
                    const title = currentUser?.names;
                    setOpenModal(false);
                    try {
                        await toast.promise(API.delete(`/person?personId=${id}`), {
                            loading: `Hold on, we are deleting ${title} from our system.`,
                            success: `Person has been deleted successfully`,
                            error: (error) => {
                                if (error.response) {
                                    return `Error: ${error.response?.data?.message || error.message || 'Unknown error occured'}`;
                                } else {
                                    return 'Something went wrong while deleting this user, please try again';
                                }
                            }
                        });
                        deleteUser(id);
                    } catch (error) {
                    } finally {
                        handleCloseModal();
                    }
                }}
            />
          <ModalDialog
                title={`${currentUser?.names}'s sponsor`}
                subTitle={`${userSponsor?.data?.names} with phone number: ${userSponsor?.data?.phoneNumber}`}
                // item={currentUser?.names}
                open={openViewModal}
                cancelText="Close"
                handleClose={handleCloseViewModal}
            />
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

const mapStateToProps = (state) => ({
  users: state.user.users
});

const mapDispatchToProps = (dispatch) => {
  return {
      getUsers: (data) => dispatch(getAllUsers(data)),
      addUser: (data) => dispatch(addUser(data)),
      deleteUser: (id) => dispatch(deleteUser(id)),
      editUser: (data) => dispatch(editUser(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tables);
