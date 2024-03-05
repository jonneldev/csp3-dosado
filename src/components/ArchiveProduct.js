import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function ArchiveProduct({ product, isActive, fetchData }) {

  const handleArchiveToggle = (productId) => {
    console.log('Archiving product with ID:', productId);

    const url = `${process.env.REACT_APP_API_URL}/products/${productId}/archive`;

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        const successMessage = 'Product successfully disabled';
        const errorMessage = 'Something went wrong. Please try again.';

        if (data === true) {
          showSuccessAlert(successMessage);
          fetchData();
        } else {
          showErrorAlert(errorMessage);
          fetchData();
        }
      })
      .catch(error => {
        console.error('Error during fetch:', error);
        showErrorAlert('Failed to fetch. Please try again.');
      });
  };

  const handleActivateToggle = (productId) => {
    console.log('Activating product with ID:', productId);

    const url = `${process.env.REACT_APP_API_URL}/products/${productId}/activate`;

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        const successMessage = 'Product successfully enabled';
        const errorMessage = 'Something went wrong. Please try again.';

        if (data === true) {
          showSuccessAlert(successMessage);
          fetchData();
        } else {
          showErrorAlert(errorMessage);
          fetchData();
        }
      })
      .catch(error => {
        console.error('Error during fetch:', error);
        showErrorAlert('Failed to fetch. Please try again.');
      });
  };

  const showSuccessAlert = (text) => {
    Swal.fire({
      title: 'Success',
      icon: 'success',
      text,
    });
  };

  const showErrorAlert = (text) => {
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text,
    });
  };

  return (
    <>
      {isActive ?
        <Button variant="danger" size="sm" onClick={() => handleArchiveToggle(product)}>Archive</Button>
        :
        <Button variant="success" size="sm" onClick={() => handleActivateToggle(product)}>Activate</Button>
      }
    </>
  );
}
