import { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import styled from 'styled-components';

const StyledUploadImage = styled.div`
  .image-preview {
    max-width: 100%;
    max-height: 300px;
  }
`;

export default function UploadImage({ setImageURL }: any) {
  const [file, setFile] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<any>('');

  const onFileSubmit = (e: any) => {
    e.preventDefault();
    if (file !== '') saveToServer(file);
    else console.log('Nie wybrano pliku!');
  };

  const photoUpload = (e: any) => {
    e.preventDefault();
    const reader = new FileReader();
    const file2 = e.target.files[0];
    // console.log('reader', reader);

    if (reader !== undefined && file2 !== undefined) {
      reader.onloadend = () => {
        console.log(file);

        setFile(file2);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file2);
    }
  };

  function saveToServer(file: any) {
    console.log(file);
    const formData = new FormData();
    formData.append('media', file);

    formData.append('key', '000442a1b0d53357c422b84d9fb85b87');

    fetch('https://thumbsnap.com/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          console.log(response);
          return response.json();
        }
      })
      .then((json) => {
        console.log(json);
        console.log(json.data.thumb);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <StyledUploadImage>
      {imagePreview !== '' && <img className="image-preview" src={imagePreview} alt="Podgląd zdjęcia" />}
      <Form onSubmit={(e) => onFileSubmit(e)}>
        <Form.Control
          type="file"
          name="avatar"
          id="file"
          accept=".jpef, .png, .jpg"
          onChange={photoUpload}
          src={imagePreview}
        />
        <Button variant="secondary" type="submit">
          Wyślij
        </Button>
      </Form>
      {/* <input type="file" accept=".jpef, .png, .jpg" onChange={photoUpload} src={imagePreview} /> */}
    </StyledUploadImage>
  );
}
