import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Checkbox,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,

} from "@mui/material";
import { Add, Close, Delete } from "@mui/icons-material";
import UploadImageCircle from "../../components/UploadImageCircle";
import { Trash2 } from "lucide-react";
import OrangeBackground from "../../components/Orangebackground";
import Swal from "sweetalert2";
import ApiService from "../../controller/ApiController";
// import "./article.css";
const sampleArticles = [
    {
      id: 1,
      title: "Exploring React 18 Features",
      description: "A deep dive into concurrent rendering and more.",
      imageUrl: "https://via.placeholder.com/100"
    },
    {
      id: 2,
      title: "Mastering TypeScript",
      description: "Tips for scaling your JavaScript codebase with TypeScript.",
      imageUrl: "https://via.placeholder.com/100"
    },
    {
      id: 3,
      title: "Next.js vs Remix",
      description: "A modern comparison of two React frameworks.",
      imageUrl: "https://via.placeholder.com/100"
    }
  ];
export default function AutoDealership() {
    const [autodealership, setAutodealership] = useState([]);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [selected, setSelected] = useState([]);
    const [editOpen, setEditOpen] = useState(false);
    const [currentAutodealership, setCurrentAutodealership] = useState(null);
    const handleSelect = (id) => {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    };
    
    const isSelected = (id) => selected.includes(id);
    
    const handleSelectAll = (data) => {
      if (selected.length === data.length) {
        setSelected([]);
      } else {
        setSelected(data.map((item) => item.id));
      }
    };
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      setImageFile(file);
  
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    };

    const getAutoDealership = () => { 
      ApiService.getAllAutoDealership()
        .then((response) => {
          if (response.data.status === 200) {
            setAutodealership(response.data.data);
          } else {
            console.log("Error fetching articles:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching articles:", error);
        });
    };
    useEffect(() => {
      getAutoDealership();

    },[])
  
    const handleSubmit = () => {
      if (!title || !description ) {
        Swal.fire({
          icon: 'warning',
          title: 'Please fill all fields and select an image.',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
        });
        return;
      }
    
      // const formData = new FormData();
      // formData.append("title", title);
      // formData.append("description", description);
      // formData.append("image", imageFile);
    
      ApiService.createAutodealerShip({
        title,
        description
      })
        .then((response) => {
          if(response.data.message === 'Updated Successfully'){
            getAutoDealership();
            Swal.fire({
              icon: 'success',
              title: 'Updated Successfully',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
            });
           
          } else {
            console.log("Article get error:", response.data);
          }
    
         
    
          // Reset form
          setAutodealership([]);
          setTitle("");
          setDescription("");
          setImageFile(null);
          setImagePreview(null);
          setOpen(false);
        })
        .catch((error) => {
          console.error("Error creating article:", error);
          Swal.fire({
            icon: 'error',
            title: 'Failed to create article!',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
          });
        });
    };
    const handleEditOpen = (article) => {
      setCurrentAutodealership(article);
      setEditOpen(true);
    };
    
    // HANDLE EDIT SAVE
    const handleEditSubmit = () => {
      if (!currentAutodealership.title || !currentAutodealership.description) {
        alert("Please fill all fields.");
        return;
      }
    
      setAutodealership((prev) =>
        prev.map((a) => (a._id === currentAutodealership._id ? currentAutodealership : a))
      );
      setEditOpen(false);
      setCurrentAutodealership(null);
    };
    const handleDeleteAll = () => {
      if (window.confirm("Are you sure you want to delete all articles?")) {
          setAutodealership([]);
      }
  }
    return (
      <>
  
           <OrangeBackground />
      <Box sx={{ p: 3, maxWidth: 1100, mx: "auto",zIndex: 1 ,position: "relative" }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
    <Typography variant="h4">Auto dealership</Typography>
  
    <Box display="flex" alignItems="center" gap={2}>
      <Button
        variant="contained"
        startIcon={<Add />}
        sx={{ backgroundColor: "#0d9488" }}
        onClick={() => setOpen(true)}
      >
        Add Auto dealership
      </Button>
      
      <Button color="error" onClick={handleDeleteAll} sx={{ backgroundColor: "#f3d4d4", padding: "10px 12px" }}>
      <Trash2 />
      </Button>
    </Box>
  </Box>
  
  <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < sampleArticles.length
                  }
                  checked={
                    sampleArticles.length > 0 &&
                    selected.length === sampleArticles.length
                  }
                  onChange={() => handleSelectAll(sampleArticles)}
                />
              </TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {autodealership.map(({ _id, title, description, imageUrl }) => (
              <TableRow
                key={_id}
                selected={isSelected(_id)}
                hover
                sx={{ verticalAlign: "middle" }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected(_id)}
                    onChange={() => handleSelect(_id)}
                  />
                </TableCell>
                <TableCell>
                  <Avatar
                    src={imageUrl}
                    variant="rounded"
                    sx={{ width: 64, height: 64 }}
                  />
                </TableCell>
                <TableCell>{title}</TableCell>
                <TableCell>{description}</TableCell>
                <TableCell>
                  <div className="action-buttons">
                  <button className="edit-btn" onClick={() => handleEditOpen({ _id, title, description, imageUrl })}>
                    Edit
                  </button>
                  <button className="delete-btn"  onClick={() => console.log("Delete", _id)}>
                    Delete
                  </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
          Auto dealership
            <IconButton
              aria-label="close"
              onClick={() => setOpen(false)}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <Close />
            </IconButton>
          </DialogTitle>
  
          <DialogContent dividers>
          <div style={{ display: "flex", justifyContent: "center", margin: "20px 0", flexDirection: "column", alignItems: "center",gap: "10px" }}>
        <UploadImageCircle imagePreview={imagePreview} onImageChange={handleImageChange} />
         <p style={{color:'blue'}}>Upload Image</p>
        </div>
            <TextField
              label="Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
            />
  
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="normal"
            />
  
           
          </DialogContent>
  
          <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
           
            <Button variant="contained" onClick={handleSubmit} sx={{ backgroundColor: "#0d9488" ,width: "300px"}}>
             Save
            </Button>
          </div>
        </Dialog>
  
        <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
    <DialogTitle>
      Edit Auto dealership
      <IconButton
        aria-label="close"
        onClick={() => setEditOpen(false)}
        sx={{ position: "absolute", right: 8, top: 8 }}
      >
        <Close />
      </IconButton>
    </DialogTitle>
  
    <DialogContent dividers>
      <div style={{ display: "flex", justifyContent: "center", margin: "20px 0", flexDirection: "column", alignItems: "center",gap: "10px"  }}>
        
        <UploadImageCircle
          imagePreview={currentAutodealership?.imageUrl}
          onImageChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () =>
                setCurrentAutodealership((prev) => ({ ...prev, imageUrl: reader.result }));
              reader.readAsDataURL(file);
            }
          }}
        />
         <p style={{color:'blue'}}>Upload Image</p>
      </div>
  
      <TextField
        label="Title"
        fullWidth
        value={currentAutodealership?.title || ""}
        onChange={(e) =>
            setCurrentAutodealership((prev) => ({ ...prev, title: e.target.value }))
        }
        margin="normal"
      />
  
      <TextField
        label="Description"
        fullWidth
        multiline
        rows={4}
        value={currentAutodealership?.description || ""}
        onChange={(e) =>
            setCurrentAutodealership((prev) => ({ ...prev, description: e.target.value }))
        }
        margin="normal"
      />
    </DialogContent>
  
    <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
      <Button
        variant="contained"
        onClick={handleEditSubmit}
        sx={{ backgroundColor: "#0d9488", width: "300px" }}
      >
        Update
      </Button>
    </div>
  </Dialog>
  
      </Box>
      </>
    );
}
