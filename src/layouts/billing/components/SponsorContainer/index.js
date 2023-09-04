import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { useState, useEffect } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import borders from "assets/theme/base/borders";
import SponsorCard from "../SponsorCard"; 
import ListItemIcon from "@mui/material/ListItemIcon";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Menu,
  MenuItem,
} from "@mui/material"
import DataWidget from "components/Global/DataWidget";
import { getAllSponsors, addSponsor, deleteSponsor, editSponsor } from "store/actions/sponsor";
import { connect } from 'react-redux';
import { useFetcher, API } from "apiFetch";
import Sidebar from 'components/Global/Sidebar';
import { toast } from 'react-hot-toast';
import { compareObj } from "config/constant";
import SoftInput from "components/SoftInput";
import ModalDialog from "components/Global/ModalDialog";

const initFormData = {
  names: '',
  phoneNumber: '',
};

const initState = { loading: false, error: null };

function SponsorContainer({ sponsors, getSponsors, addSponsor, editSponsor, deleteSponsor }) {
  const { borderWidth, borderColor } = borders;
  const [openSidebar, setOpenSidebar] = useState(false);
    const [formData, setFormData] = useState(initFormData);
    const [state, setState] = useState(initState);
    const [currentUser, setCurrentUser] = useState(null);

    const { data, isError, isLoading } = useFetcher('/sponsor');

    useEffect(() => {
        if (data?.data?.length) {
          getSponsors({ sponsors: data?.data });
        }
    }, [data?.data?.length]);

    useEffect(() => {
        if (currentUser) {
            setFormData({
                names: currentUser.names,
                phoneNumber: currentUser.phoneNumber
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
                    API.patch(`/sponsor?sponsorId=${currentUser._id}`, newObj),
                    {
                        loading: `Updating sponsor, please wait...`,
                        success: `Sponsor updated successfully!`,
                        error: `Something went wrong while updating this sponsor`
                    },
                    { position: 'top-center' }
                );
                editSponsor(result.data.data);
                setCurrentUser(null);
            } else {
                const result = await toast.promise(
                    API.post(`/sponsor`, formData),
                    {
                        loading: `Adding sponsor, please wait...`,
                        success: `Sponsor added successfully!`,
                        error: `Something went wrong while adding this sponsor`
                    },
                    { position: 'top-center' }
                );
                addSponsor(result.data.data);
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

    const RenderMenu = ({ menu, openMenu, closeMenu, onEdit, onDelete }) => {
      return (
        <Menu
          id="simple-menu"
          anchorEl={menu}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(menu)}
          onClose={closeMenu}
        >
          <MenuItem onClick={onEdit}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            Edit
          </MenuItem>
          <MenuItem onClick={onDelete}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            Delete
          </MenuItem>
        </Menu>
      );
    }
    
    function RenderMenuWrapper({ onAssign, onEdit, onDelete, key }) {
      const [menu, setMenu] = useState(null);
    
      const openMenu = ({ currentTarget }) => setMenu(currentTarget);
      const closeMenu = () => setMenu(null);
    
      return (
        <SoftTypography
          component="div"
          variant="caption"
          color="secondary"
          fontWeight="medium"
          key={key}
        >
          <SoftBox color="text" px={2}>
            <Icon
              sx={{ cursor: "pointer", fontWeight: "bold" }}
              fontSize="small"
              onClick={openMenu}
            >
              more_vert
            </Icon>
          </SoftBox>
          <RenderMenu menu={menu} openMenu={openMenu} closeMenu={closeMenu} onEdit={onEdit} onDelete={onDelete}/>
        </SoftTypography>
      );
    }

  return (
    <Card id="delete-account" sx={{ p: 2}}>
      <SoftBox pt={2} px={2} mb={3} display="flex" justifyContent="space-between" alignItems="center">
        <SoftTypography variant="h6" fontWeight="medium">
          All Sponsors
        </SoftTypography>
        <Sidebar
          title={currentUser ? 'Update Sponsor' : 'Add New Sponsor'}
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
          <SoftInput
              placeholder="Phone Number"
              type="number"
              value={formData.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
          />
      </Sidebar>
      </SoftBox>
      <SoftBox p={2}>
        <DataWidget
          title="Sponsors"
          isLoading={isLoading && !sponsors.length}
          isError={isError && !sponsors.length}
          isEmpty={!sponsors.length}
        >
          <Grid container spacing={3}>
                {
                  sponsors?.map((sponsor, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <SoftBox
                        border={`${borderWidth[1]} solid ${borderColor}`}
                        borderRadius="lg"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        px={3}
                        py={1}
                        sx={{ listStyle: "none" }}
                      >
                        <SoftTypography variant="h6" fontWeight="medium">
                          <SponsorCard
                            color="dark"
                            index={index + 1}
                            name={sponsor?.names}
                            description={sponsor?.phoneNumber}
                          />
                        </SoftTypography>
                        <RenderMenuWrapper 
                          key={index} 
                          onEdit={() => {
                            setCurrentUser(sponsor);
                            handleOpenSidebar();
                          }}
                          onDelete={() => {
                            setCurrentUser(sponsor)
                            handleOpenModal()
                          }}
                        />
                      </SoftBox>
                    </Grid>
                  ))
                }
              
          </Grid>
        </DataWidget>

        <ModalDialog
            title="Delete Sponsor?"
            subTitle={`Are you sure do you want to delete this sponsor? `}
            item={currentUser?.names}
            open={openModal}
            handleClose={handleCloseModal}
            cancelText="Cancel"
            showOkText
            handleClickOk={async () => {
                const id = currentUser?._id;
                const title = currentUser?.names;
                setOpenModal(false);
                try {
                    await toast.promise(API.delete(`/sponsor?sponsorId=${id}`), {
                        loading: `Hold on, we are deleting ${title} from our system.`,
                        success: `Sponsor has been deleted successfully`,
                        error: (error) => {
                            if (error.response) {
                                return `Error: ${error.response?.data?.message || error.message || 'Unknown error occured'}`;
                            } else {
                                return 'Something went wrong while deleting this sponsor, please try again';
                            }
                        }
                    });
                    deleteSponsor(id);
                } catch (error) {
                } finally {
                    handleCloseModal();
                }
            }}
          />
      </SoftBox>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  sponsors: state.sponsor.sponsors
});

const mapDispatchToProps = (dispatch) => {
  return {
      getSponsors: (data) => dispatch(getAllSponsors(data)),
      addSponsor: (data) => dispatch(addSponsor(data)),
      deleteSponsor: (id) => dispatch(deleteSponsor(id)),
      editSponsor: (data) => dispatch(editSponsor(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SponsorContainer);
