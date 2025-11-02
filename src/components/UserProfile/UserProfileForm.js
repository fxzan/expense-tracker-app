import React from "react";
import "./UserProfileForm.css";
import supabase from "../../helper/supabaseClient";

function UserProfileForm(props) {
  const [name, setName] = React.useState(props.details.name);
  const [imageUrl, setImageUrl] = React.useState(props.details.photo);
  const defaultPhoto = "https://e7.pngegg.com/pngimages/798/436/png-clipart-computer-icons-user-profile-avatar-profile-heroes-black.png";

  async function submitHandler(event) {
    event.preventDefault();
    if (imageUrl !== props.details.photo && props.details.photo !== "") {
      await deleteImage(props.details.photo);
    }
    props.onSubmitForm({
      displayName: name,
      photoUrl: imageUrl,
    });
    props.onClose();
  }

  function nameChangeHandler(event) {
    setName(event.target.value);
  }

  function removeImageHandler() {
    setImageUrl("");
    console.log("Removed");
  }

  async function cancelHandler() {
    if (imageUrl !== props.details.photo && imageUrl !== "") {
      deleteImage(imageUrl);
    }
    console.log("Cancel");
    props.onClose();
  }

  function getFilePathFromUrl(publicUrl) {
    const url = new URL(publicUrl);
    const pathParts = url.pathname.split('/');
    const bucketIndex = pathParts.indexOf('avatars');
    
    if (bucketIndex === -1) {
      throw new Error('Invalid URL: bucket not found');
    }
    
    const filePath = pathParts.slice(bucketIndex + 1).join('/');
    return filePath;
  };

  async function deleteImage(url) {
    try {
      const filePath = getFilePathFromUrl(url);

      const { data, error } = await supabase.storage
        .from('avatars')
        .remove([filePath]);

      if (error) {
        console.log("delete error")
        console.log(error);
        throw new Error(`${error.code} ${error.message}`)
      }
      console.log("Deleted");
    } catch (error) {
      alert(error);
    }
  };

  async function uploadImage(event) {
    try {
      const file = event.target.files[0];
      if(!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${props.details.userId}/${fileName}`;

      const {data, error} = await supabase.storage.from('avatars').upload(filePath, file);

      if (error) {
        console.log(error);
        throw new Error(`${error.code} ${error.message}`)
      }

      const { data: publicData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
      
      console.log("Uploaded");
      setImageUrl(publicData.publicUrl);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="user-profile-form">
      <form onSubmit={submitHandler}>
        <div className="profile-form-input">
          <label>Name: </label>
          <input
            id="name"
            type="text"
            placeholder="Display Name"
            value={name}
            onChange={nameChangeHandler}
            required
          />
        </div>
        <div className="profile-form-input">
          <label>Picture: </label>
          <div className="profile-form-buttons">
            <label htmlFor="file-upload" className="action-button">
              Choose File
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={uploadImage}
              className="upload-button"
            />
            <input type="button" value="Remove" onClick={removeImageHandler} className="action-button cancel-button" />
          </div>
        </div>
        <img className="profile-form-image" src={imageUrl || defaultPhoto} alt="" />
        <div className="user-profile-form-actions">
          <button className="action-button">Save</button>
          <button
            className="action-button cancel-button"
            onClick={cancelHandler}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserProfileForm;
