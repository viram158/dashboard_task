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
import ApiService from "../../controller/ApiController";
import Swal from "sweetalert2";
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
export default function BlogPage() {
    const [blogpage, setBlogpage] = useState({});
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [selected, setSelected] = useState([]);
    const [editOpen, setEditOpen] = useState(false);
    const [currentBlogpage, setCurrentBlogpage] = useState(null);
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
  const getblogpage = () => {
    ApiService.allBlogPage().then((response)=>{
      if(response.data.status === 200){
        setBlogpage(response.data.data);
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    getblogpage();
  },[])
    const handleSubmit = () => {
      if (!title || !description || !imageFile) {
        alert("Please fill all fields and select an image.");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", imageFile);

      ApiService.createBlogPage(formData).then((response)=>{
        if(response.data.status === 200){
          Swal.fire({
            icon: 'success',
            title: response.data.message,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
          });
        }else{

        }
      }).catch((error)=>{
        Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
        });
        console.error("Error creating blog page:", error);
      })
  
  
      
      setTitle("");
      setDescription("");
      setImageFile(null);
      setImagePreview(null);
      setOpen(false);
    };
    const handleEditOpen = (article) => {
      setCurrentBlogpage(article);
      setEditOpen(true);
    };
    
    // HANDLE EDIT SAVE
    const handleEditSubmit = () => {
      if (!currentArticle.title || !currentArticle.description) {
        alert("Please fill all fields.");
        return;
      }
    
      setBlogpage((prev) =>
        prev.map((a) => (a.id === currentArticle.id ? currentArticle : a))
      );
      setEditOpen(false);
      setCurrentBlogpage(null);
    };
    const handleDeleteAll = () => {
      if (window.confirm("Are you sure you want to delete all articles?")) {
          setBlogpage([]);
      }
  }
    return (
      <>
  
           <OrangeBackground />
      <Box sx={{ p: 3, maxWidth: 1100, mx: "auto",zIndex: 1 ,position: "relative" }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
    <Typography variant="h4">Blog page</Typography>
  
    <Box display="flex" alignItems="center" gap={2}>
      <Button
        variant="contained"
        startIcon={<Add />}
        sx={{ backgroundColor: "#0d9488" }}
        onClick={() => setOpen(true)}
      >
        Add Blog page
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
            {/* {sampleArticles.map(({ id, title, description, imageUrl }) => ( */}
              <TableRow
                key={blogpage._id}
                selected={isSelected(blogpage._id)}
                hover
                sx={{ verticalAlign: "middle" }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected(blogpage._id)}
                    onChange={() => handleSelect(blogpage._id)}
                  />
                </TableCell>
                <TableCell>
                  <Avatar
                    src={blogpage.image}
                    variant="rounded"
                    sx={{ width: 64, height: 64 }}
                  />
                </TableCell>
                <TableCell>{blogpage.title}</TableCell>
                <TableCell>{blogpage.description}</TableCell>
                <TableCell>
                  <div className="action-buttons">
                  <button className="edit-btn" onClick={() => handleEditOpen(blogpage)}>
                    Edit
                  </button>
                  <button className="delete-btn"  onClick={() => console.log("Delete", blogpage._id)}>
                    Delete
                  </button>
                  </div>
                </TableCell>
              </TableRow>
            {/* ))} */}
          </TableBody>
        </Table>
      </TableContainer>
  
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
          Blog page
            <IconButton
              aria-label="close"
              onClick={() => setOpen(false)}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <Close />
            </IconButton>
          </DialogTitle>
  
          <DialogContent dividers>
          <div style={{ display: "flex", justifyContent: "center", margin: "20px 0", flexDirection: "column", alignItems: "center",gap: "10px"  }}>
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
      Edit Blog page
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
          imagePreview={currentBlogpage?.imageUrl}
          onImageChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () =>
                setCurrentBlogpage((prev) => ({ ...prev, imageUrl: reader.result }));
              reader.readAsDataURL(file);
            }
          }}
        />
         <p style={{color:'blue'}}>Upload Image</p>
      </div>
  
      <TextField
        label="Title"
        fullWidth
        value={currentBlogpage?.title || ""}
        onChange={(e) =>
            setCurrentBlogpage((prev) => ({ ...prev, title: e.target.value }))
        }
        margin="normal"
      />
  
      <TextField
        label="Description"
        fullWidth
        multiline
        rows={4}
        value={currentBlogpage?.description || ""}
        onChange={(e) =>
            setCurrentBlogpage((prev) => ({ ...prev, description: e.target.value }))
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
