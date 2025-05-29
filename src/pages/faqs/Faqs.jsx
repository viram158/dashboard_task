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


export default function Faqs() {
    const [faqs, setFaqs] = useState([]);
    const [open, setOpen] = useState(false);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const [selected, setSelected] = useState([]);
    const [editOpen, setEditOpen] = useState(false);
    const [currentFaqs, setCurrentFaqs] = useState(null);
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

    const getAllfaq = ()=>{
      ApiService.getfaq().then((response)=>{
        if(response.data.status === 200){
          setFaqs(response.data.data);
        }
      }).catch((error)=>{
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong. Please try again later.',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
        });
      })
    }
 
    useEffect(() => {
      getAllfaq();
    }, []);
  
    const handleSubmit = () => {
      if (!question || !answer) {
        alert("Please fill all fields");
        return;
      }
  
      ApiService.createfaq({
        question,
        answer
      }).then((response)=>{
        if(response.data.status === 200){
          getAllfaq();
          Swal.fire({
            icon: 'success',
            title: response.data.message,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
          });
        }
      }).catch((error)=>{
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong. Please try again later.',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
        });
      })
  
      setQuestion("");
      setAnswer("");
      setOpen(false);
    };
    const handleEditOpen = (article) => {
      setCurrentFaqs(article);
      setEditOpen(true);
    };
    
    // HANDLE EDIT SAVE
    const handleEditSubmit = () => {
      if (!currentFaqs.question || !currentFaqs.answer) {
        alert("Please fill all fields.");
        return;
      }
    
      ApiService.updatefaq(currentFaqs._id, {
        question: currentFaqs.question,
        answer: currentFaqs.answer,
      })
        .then((response) => {
          if (response.data.status === 200) {
            Swal.fire({
              icon: 'success',
              title: response.data.message,
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something went wrong. Please try again later.',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
          });
        });
      setFaqs((prev) =>
        prev.map((a) => (a._id === currentFaqs._id ? currentFaqs : a))
      );
      setEditOpen(false);
      setCurrentFaqs(null);
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
          ApiService.deletefaq(id)
            .then((response) => {
             
                getAllfaq()
                Swal.fire({
                  icon: 'success',
                  title: 'Faq has been deleted.',
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                });
              
            })
            .catch((error) => {
              console.error("Error deleting faq:", error);
              Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to delete faq.',
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
      if (window.confirm("Are you sure you want to delete all Faqs?")) {
          setFaqs([]);
      }
  }
    return (
      <>
  
           <OrangeBackground />
      <Box sx={{ p: 3, maxWidth: 1100, mx: "auto",zIndex: 1 ,position: "relative" }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
    <Typography variant="h4">Faqs</Typography>
  
    <Box display="flex" alignItems="center" gap={2}>
      <Button
        variant="contained"
        startIcon={<Add />}
        sx={{ backgroundColor: "#0d9488" }}
        onClick={() => setOpen(true)}
      >
        Add Faqs
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
                    selected.length > 0 && selected.length < faqs.length
                  }
                  checked={
                    faqs.length > 0 &&
                    selected.length === faqs.length
                  }
                  onChange={() => handleSelectAll(faqs)}
                />
              </TableCell>
              <TableCell>Question</TableCell>
              <TableCell>Answer</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {faqs.map(({ _id, question, answer }) => (
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
                <TableCell>{question}</TableCell>
                <TableCell>{answer}</TableCell>
                <TableCell>
                  <div className="action-buttons">
                  <button className="edit-btn" onClick={() => handleEditOpen({ _id, question, answer })}>
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
          Faqs
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
              label={
                <span>
                  Question <span style={{ color: 'red' }}>*</span>
                </span>
              }
              fullWidth
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              margin="normal"
            />
  
            <TextField
              label={
                <span>
                    Answer <span style={{ color: 'red' }}>*</span>
                </span>
              }
              fullWidth
              multiline
              rows={4}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
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
      Edit Faqs
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
        label={
            <span>
              Question <span style={{ color: 'red' }}>*</span>
            </span>
          }
        fullWidth
        value={currentFaqs?.question || ""}
        onChange={(e) =>
            setCurrentFaqs((prev) => ({ ...prev, question: e.target.value }))
        }
        margin="normal"
      />
  
      <TextField
        label={
            <span>
                Answer <span style={{ color: 'red' }}>*</span>
            </span>
          }
        fullWidth
        multiline
        rows={4}
        value={currentFaqs?.answer || ""}
        onChange={(e) =>
            setCurrentFaqs((prev) => ({ ...prev, answer: e.target.value }))
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
