import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchPhotos } from '../services/api';
import { useState, useEffect} from 'react';
import  Searchbar  from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import  Modal  from './Modal/Modal';
import { AppWrapper } from './App.styled';
import { scrollToBottom } from 'utils/scroll';


export default function App()  {
   const [cards, setCards] = useState([]);
   const [loading, setLoading] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');
   const [page, setPage] = useState(1);
   const [showModal, setShowModal] = useState(false);
   const [forModalLink, setForModalLink] = useState('');
   const [loadMore, setLoadMore] = useState(false);
  
    useEffect (()=>{
      if(!searchQuery) return
      setLoading(true)

      const fetchPhotosImg = async (query, page) => {
        const { hits, totalHits } = await fetchPhotos(query, page);
        try {
          if (page === 1) {
            setCards(hits);
          } else {
            setCards(prevState => [...prevState,...hits]);
          }
          setLoadMore(page < Math.ceil(totalHits / 12));

          if (totalHits === 0) {
            toast.warning(
              'Вибачте, немає зображень, які відповідають вашому пошуковому запиту. Будь ласка спробуйте ще раз.'
            );
            return;
          }
        } catch (error) {
          console.log(error);
          toast.error ('Щось пішло не так.');
        } finally {
          setLoading(false)
        }
        }
        fetchPhotosImg(searchQuery, page);
    }, [page, searchQuery]
    )
      

  // лодер, підвантажує зображеня
    const addPage = () => {
      setPage(prevState => prevState + 1);
      scrollToBottom()
    };
  
    const onShowModal = (link) => {
      setForModalLink(link);
      setShowModal(true);
    };
    const closeModal = () => {
      setShowModal(false);
      setForModalLink('');
    };
  
    // надсилаю форму пошуку та скидаю page
    const handleFormSubmit = searchText => {
      setSearchQuery(searchText);
      setPage(1);
    };
  
      
return (
 
      
    <AppWrapper>
      <Searchbar onSubmit={handleFormSubmit} />
      <ToastContainer />
      {cards.length !== 0 && (
        <ImageGallery imagesArray={cards} showModal={onShowModal} />
      )}
      {loading && <Loader />}
      {loadMore && (
        <Button handleClick={addPage}></Button>
      )}
     {showModal && (
<Modal handleClose={closeModal}>
  <img src={forModalLink} alt="" />
</Modal>
)}   
    </AppWrapper>  
  );
    }
  
