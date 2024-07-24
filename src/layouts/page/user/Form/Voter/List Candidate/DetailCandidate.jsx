import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  Grid,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

function ProfileDetail() {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar>{profile.name[0]}</Avatar>}
        title={profile.name}
        subheader={profile.email}
        action={
          <>
            <IconButton aria-label="edit">
              <Edit />
            </IconButton>
            <IconButton aria-label="delete">
              <Delete />
            </IconButton>
          </>
        }
      />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Typography variant="body1">
              <strong>Full Name:</strong> {profile.name}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {profile.email}
            </Typography>
            <Typography variant="body1">
              <strong>Phone:</strong> {profile.phone}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Address
            </Typography>
            <Typography variant="body1">
              {profile.address.street}, {profile.address.city}
            </Typography>
            <Typography variant="body1">
              {profile.address.state} {profile.address.zipcode}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardContent>
        <Button variant="contained" color="primary" size="large">
          Save
        </Button>
      </CardContent>
    </Card>
  );
}
export default ProfileDetail;
