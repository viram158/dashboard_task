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
import "./article.css";
import ApiService from "../../controller/ApiController";
import Swal from "sweetalert2";
import Pagination from "../../components/Pagination";

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selected, setSelected] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 12;
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
      setSelected(data.map((item) => item._id));
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
const getArticles = (page) =>{
   ApiService.getAllarticles({page, limit: itemsPerPage}).then((response) => {
    if(response.data.status === 200){
      setArticles(response.data.data.docs);
      setTotalItems(response.data.data.totalDocs); // Total count
    } else {
      console.log("Article get error:", response.data);
    }
}).catch((error) => {
    console.error("Error fetching articles:", error);
});
}

useEffect(() => {
  getArticles(currentPage);
}, [currentPage]);
  const handleSubmit = () => {
    if (!title || !description || !imageFile) {
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
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", imageFile);
  
    ApiService.createArticle(formData)
      .then((response) => {
        if(response.data.status === 200){

          Swal.fire({
            icon: 'success',
            title: 'Article created successfully!',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
          });
          getArticles()
        } else {
          console.log("Article get error:", response.data);
        }
  
       
  
        // Reset form
        setArticles([]);
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
    setCurrentArticle(article);
    setEditOpen(true);
  };
  
  // HANDLE EDIT SAVE
  const handleEditSubmit = () => {
    if (!currentArticle.title || !currentArticle.description) {
      Swal.fire({
        icon: 'warning',
        title: 'Please fill all fields.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }
  
    const formData = new FormData();
    formData.append("title", currentArticle.title);
    formData.append("description", currentArticle.description);
    if (currentArticle.image) {
      formData.append("image", currentArticle.image); // Only append if a new image is selected
    }
  
    ApiService.updateArticle(currentArticle._id, formData)
      .then((response) => {
        if (response.data.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Article updated successfully!',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
          });
  
          // Update article list (optional: refetch or manually update)
          setArticles((prev) =>
            prev.map((a) => (a._id === currentArticle._id ? response.data.data : a))
          );
  
          // Reset state
          setEditOpen(false);
          setCurrentArticle(null);
        } else {
          console.log("Update error:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error updating article:", error);
        Swal.fire({
          icon: 'error',
          title: 'Failed to update article!',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
        });
      });
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
        ApiService.deleteArticle(id)
          .then((response) => {
            if (response.data.msg === 'deleted') {
            // Refresh the articles list
              getArticles()
              Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Article has been deleted.',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
              });
              
            }
          })
          .catch((error) => {
            console.error("Error deleting article:", error);
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Failed to delete article.',
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
    if (window.confirm("Are you sure you want to delete all articles?")) {
        setArticles([]);
    }
}


  return (
    <>

         <OrangeBackground />
    <Box sx={{ p: 3, maxWidth: 1100, mx: "auto",zIndex: 1 ,position: "relative" }}>
    <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
  <Typography variant="h4">Articles</Typography>

  <Box display="flex" alignItems="center" gap={2}>
    <Button
      variant="contained"
      startIcon={<Add />}
      sx={{ backgroundColor: "#0d9488" }}
      onClick={() => setOpen(true)}
    >
      Add New Article
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
                  selected.length > 0 && selected.length < articles.length
                }
                checked={
                  articles.length > 0 &&
                  selected.length === articles.length
                }
                onChange={() => handleSelectAll(articles)}
              />
            </TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {articles.map(({ _id, title, description, image }) => (
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
                  src={image}
                  variant="rounded"
                  sx={{ width: 64, height: 64 }}
                />
              </TableCell>
              <TableCell>{title}</TableCell>
              <TableCell>{description}</TableCell>
              <TableCell align="right">
                <div className="action-buttons">
                <button className="edit-btn" onClick={() => handleEditOpen({ _id, title, description, image })}>
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
    <Box>
         {/* Pagination */}
         <Pagination
  currentPage={currentPage}
  totalPages={Math.ceil(totalItems / itemsPerPage)}
  itemsPerPage={itemsPerPage}
  totalItems={totalItems}
  onPageChange={setCurrentPage}
/>
     
    </Box>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
           Article
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
    Edit Article
    <IconButton
      aria-label="close"
      onClick={() => setEditOpen(false)}
      sx={{ position: "absolute", right: 8, top: 8 }}
    >
      <Close />
    </IconButton>
  </DialogTitle>

  <DialogContent dividers>
    <div style={{ display: "flex", justifyContent: "center", margin: "20px 0", flexDirection: "column", alignItems: "center",gap: "10px" }}>
      <UploadImageCircle
        imagePreview={currentArticle?.image}
        onImageChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () =>
              setCurrentArticle((prev) => ({ ...prev, imageUrl: reader.result }));
            reader.readAsDataURL(file);
          }
        }}
      />
    <p style={{color:'blue'}}>Upload Image</p>
    </div>

    <TextField
      label="Title"
      fullWidth
      value={currentArticle?.title || ""}
      onChange={(e) =>
        setCurrentArticle((prev) => ({ ...prev, title: e.target.value }))
      }
      margin="normal"
    />

    <TextField
      label="Description"
      fullWidth
      multiline
      rows={4}
      value={currentArticle?.description || ""}
      onChange={(e) =>
        setCurrentArticle((prev) => ({ ...prev, description: e.target.value }))
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
};

export default Article;
