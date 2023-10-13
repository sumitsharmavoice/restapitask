import React, { useEffect, useState } from 'react'
import MaterialTable from '@material-table/core';
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputLabel, TextField } from '@mui/material';
import axios from 'axios';
import './style.css';
import CloseIcon from '@mui/icons-material/Close';
import { PhotoCamera } from '@mui/icons-material';
import Swal from 'sweetalert2';


function TableData() {
  const [Products, setProducts] = useState([])


  const [open, setOpen] = useState(false);

  const [productId, setProductId] = useState('')
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [ratingValue, setRatingValue] = useState('')
  const [ratingCount, setRatingCount] = useState('')


  const handleOpenDialog = (rowData) => {
    setOpen(true)
    setProductId(rowData.id)
    setTitle(rowData.title)
    setPrice(rowData.price)
    setCategory(rowData.category)
    setDescription(rowData.description)
    setRatingValue(rowData.rating.rate)
    setRatingCount(rowData.rating.count)


  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleEditData = async (rowData) => {

    // console.warn(category,productId)

    var body = { "id": productId, "title": title, "price": price, "category": category, "description": description }
    console.log(productId, category)

    var result = await axios.put(`https://fakestoreapi.com/products/${productId}`, body)   /* {body:JSON.stringify({"title":title,"price":price,"category":category,"description":description})} */
    console.log(result)


    if (result.status) {
      handleClose()
      Swal.fire({
        icon: 'success',
        title: 'updated SuccessFully'
      })
    }
    else {
      Swal.fire({
        icon: 'error',
        title: "Oops ! Something went wrong"
      })
    }

    console.log('Updated Data:', { "id": productId, "title": title, "price": price, "category": category, "description": description })
      fetchAllProducts()

  }

  const handleDeleteData = async (rowData) => {
    handleClose()
    console.warn(rowData.id)
    Swal.fire({
      title: 'Do you want to Delete Product ?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then(async (result) => {

      if (result.isConfirmed) {
        var res = await axios.delete(`https://fakestoreapi.com/products/${rowData.id}`)
        if (res.status) {
          Swal.fire('Deleted!', '', 'Successfully')
          fetchAllProducts()
        }
        else {
          Swal.fire({
            icon: 'error',
            title: "Oops ! something went wrong"
          })
        }
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })

  }
  const showProductDetails = () => {

    return (
      <div>
        <Dialog
          open={open}

          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'cursive' }} >

              Edit Product Details
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'right' }}>
              <CloseIcon style={{ cursor: 'pointer' }} onClick={handleClose} />
            </div>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} >
              <Grid item xs={12}  >

              </Grid>
              <Grid item xs={6}>
                <TextField label="Product Id" value={productId} variant="outlined" disabled onChange={(event) => setProductId(event.target.value)} fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Product Title" value={title} variant="outlined" onChange={(event) => setTitle(event.target.value)} fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Price" value={price} variant="outlined" onChange={(event) => setPrice(event.target.value)} fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Category" value={category} variant="outlined" onChange={(event) => setCategory(event.target.value)} fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Rating Value" variant="outlined" value={ratingValue} onChange={(event) => setRatingValue(event.target.value)} fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Rating Count" variant="outlined" value={ratingCount} onChange={(event) => setRatingCount(event.target.value)} fullWidth />
              </Grid>

              <Grid item xs={12}>
                <TextField label="Description" variant="outlined" value={description} onChange={(event) => setDescription(event.target.value)} fullWidth color="success" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions >

            <Button variant="outlined" onClick={handleEditData}  >Edit </Button>
            <Button onClick={handleClose} autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }



  const fetchAllProducts = async () => {
    var result = await axios.get('https://fakestoreapi.com/products/')
    setProducts(result.data)
  }
  // console.log(Products)


  useEffect(function () {
    fetchAllProducts()
  }, [])
  function showAllProducts() {
    return (
      <MaterialTable
        style={{ borderTopRightRadius: 35, borderTopLeftRadius: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: 35, }}

        title={<span>Product Details</span>}
        columns={[
          {
            title: 'Product Id',
            field: 'id'
          },
          {
            title: 'Product title',
            render: rowData => <div style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", fontFamily: "poppins", fontWeight: 600, fontSize: "1rem", cursor: "pointer" }}>{rowData.title}</div>
          },
          {
            title: 'Category & Price',
            render: rowData => <div>{rowData.category}<br /> $ {rowData.price}</div>
          },
          {
            title: 'Description',
            render: rowData => <div style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", fontFamily: "poppins", fontWeight: 600, fontSize: "1rem", cursor: "pointer" }}>{rowData.description}</div>
          },
          {
            title: 'Rating',
            render: rowData => <div> Rate: {rowData.rating.rate}<br /> Count: {rowData.rating.count}</div>
          },
          {
            title: 'Image',
            render: rowData => <Avatar src={rowData.image} variant="rounded" style={{ width: 70, height: 70 }} />
          },
          // { title: 'Status', field: 'status' },


        ]}

        data={Products}
        actions={[
          {
            icon: 'add',
            isFreeAction: true,
            onClick: (event, rowData) => ('')
          },
          {
            icon: 'edit',
            tooltip: 'Edit User',
            onClick: (event, rowData) => handleOpenDialog(rowData)
          },
          {
            icon: 'delete',
            tooltip: 'Delete User',
            onClick: (event, rowData) => handleDeleteData(rowData)
          }
        ]}

      />
    )
  }


  return (
    <div className='tabledata-maindiv'>
      <div className='tabledata-scnddiv'>
        {showAllProducts()}
        {showProductDetails()}
      </div>
    </div>
  )
}

export default TableData;