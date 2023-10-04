import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  SearchbarTop,
  SearchForm,
  SearchFormInput,
  SearchFormButton,
  SearchFormButtonLabel,
} from './Searchbar.styled';

export default function Searchbar({onSubmit}) {
  const [searchText, setSearchText] = useState('')

  // оновлю стан компонента коли з'являється текст
  const handleChange = e => {
    setSearchText(e.currentTarget.value);
  };
// надсилаю форму пошуку
  const handleSubmit = e => {
    e.preventDefault();
    if (searchText.trim() === '') {
      return toast.error ('Введіть дані для пошуку');
      
    }
  onSubmit(searchText);
  };


 
    return (
      <SearchbarTop>
        <SearchForm onSubmit={handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>
          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchText}
            onChange={handleChange}
          />
        </SearchForm>
      </SearchbarTop>
    );
  }


