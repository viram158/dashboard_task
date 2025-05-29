import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
  IconButton,
  Avatar,
  Checkbox,
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
import ApiService from "../../controller/ApiController";
import Swal from "sweetalert2";
// import "./article.css";

export default function BlogCategory() {
    const [blogcategory, setBlogcategory] = useState([]);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [selected, setSelected] = useState([]);
    const [editOpen, setEditOpen] = useState(false);
    const [currentBlogcategory, setCurrentBlogcategory] = useState(null);
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

    const getBlogcategory = () =>{
      ApiService.getAllBlogcategory().then((response)=>{
        if(response.data.status === 200){
          setBlogcategory(response.data.data);
        }else{
          console.log(response.data)
        }
      }).catch((error)=>{
        console.error("Error fetching blog categories:", error);
      })
    }

  useEffect(() => {
    getBlogcategory();
  },[]);
    const handleSubmit = () => {
      if (!title || !description ) {
        alert("Please fill all fields and select an image.");
        return;
      }
  
  
      ApiService.createBlogcategory({ title, description }).then((response) => {

          if(response.data.status === 200){
            getBlogcategory();
            Swal.fire({
              icon: 'success',
              title: 'Updated Successfully',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
            });
          }else{
            console.log(response.data)
          }
      }).catch((error)=>{
        console.error("Error creating blog category:", error);
      })
      // const newBlogcategory = {
      //   id: Date.now(),
      //   title,
      //   description,
      // };
  
      // setBlogcategory([newBlogcategory, ...blogcategory]);
      setTitle("");
      setDescription("");
      setOpen(false);
    };
    const handleEditOpen = (article) => {
      setCurrentBlogcategory(article);
      setEditOpen(true);
    };
    
    // HANDLE EDIT SAVE
    const handleEditSubmit = () => {
      if (!currentBlogcategory.title || !currentBlogcategory.description) {
        alert("Please fill all fields.");
        return;
      }

      ApiService.updateBlogCategory(currentBlogcategory._id, currentBlogcategory)
        .then((response) => {
          if(response.data.message === "Updated Successfully"){
            getBlogcategory();
            Swal.fire({
              icon: 'success',
              title: 'Updated Successfully',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
            });
          }else{
            console.log(response.data)
          }
        })
        .catch((error) => {
          console.error("Error updating blog category:", error);
        });
    
      setBlogcategory((prev) =>
        prev.map((a) => (a._id === currentBlogcategory._id ? currentBlogcategory : a))
      );
      setEditOpen(false);
      setCurrentBlogcategory(null);
    };

    const handleDelete = (id) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0d9488',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          ApiService.deleteBlogCategory(id)
            .then((response) => {
             
                getBlogcategory()
                Swal.fire({
                  icon: 'success',
                  title: 'Blog category has been deleted.',
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                });
              
            })
            .catch((error) => {
              console.error("Error deleting article:", error);
              Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to delete blog category.',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
              });
            });
        }
      });
    };
    const handleDeleteAll = () => {
      if (window.confirm("Are you sure you want to delete all Blogcategories?")) {
          setBlogcategory([]);
      }
  }
    return (
      <>
  
           <OrangeBackground />
      <Box sx={{ p: 3, maxWidth: 1100, mx: "auto",zIndex: 1 ,position: "relative" }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
    <Typography variant="h4">Blog category</Typography>
  
    <Box display="flex" alignItems="center" gap={2}>
      <Button
        variant="contained"
        startIcon={<Add />}
        sx={{ backgroundColor: "#0d9488" }}
        onClick={() => setOpen(true)}
      >
        Add Blog category
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
                    selected.length > 0 && selected.length < blogcategory.length
                  }
                  checked={
                    blogcategory.length > 0 &&
                    selected.length === blogcategory.length
                  }
                  onChange={() => handleSelectAll(blogcategory)}
                />
              </TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogcategory.map(({ _id, title, description, imageUrl }) => (
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
                <TableCell>{title}</TableCell>
                <TableCell>{description}</TableCell>
                <TableCell>
                  <div className="action-buttons">
                  <button className="edit-btn" onClick={() => handleEditOpen({ _id, title, description, imageUrl })}>
                    Edit
                  </button>
                  <button className="delete-btn"  onClick={() => handleDelete(_id)}>
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
          Blog category
            <IconButton
              aria-label="close"
              onClick={() => setOpen(false)}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <Close />
            </IconButton>
          </DialogTitle>
  
          <DialogContent dividers>
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
      Edit Blog category
      <IconButton
        aria-label="close"
        onClick={() => setEditOpen(false)}
        sx={{ position: "absolute", right: 8, top: 8 }}
      >
        <Close />
      </IconButton>
    </DialogTitle>
  
    <DialogContent dividers>
     
  
      <TextField
        label="Title"
        fullWidth
        value={currentBlogcategory?.title || ""}
        onChange={(e) =>
            setCurrentBlogcategory((prev) => ({ ...prev, title: e.target.value }))
        }
        margin="normal"
      />
  
      <TextField
        label="Description"
        fullWidth
        multiline
        rows={4}
        value={currentBlogcategory?.description || ""}
        onChange={(e) =>
            setCurrentBlogcategory((prev) => ({ ...prev, description: e.target.value }))
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
