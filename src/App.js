import { useState, useEffect, useRef } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import './App.css';

import { generateAntiFraudHeaders } from './utils/headers';

const PUBLIC_KEY = 'pub_sandbox_6JYHNKY3.LxTGhI4SgiWGVODNr9Q2tLaiurhxbpcY';
const holacashApiBaseUrl = "https://sandbox.api.holacash.mx/v2";

function App() {
  const [pokemons, setPokemons] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [success, setSuccess] = useState(false);
  const [details, setDetails] = useState();

  const ref= useRef(null);

  const getPokemons = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0').then(response => response.json());
      setPokemons(response);
    } catch (error) {
     console.log(error); 
    }
  }

  useEffect(() => {
    getPokemons();
  }, []);

  const onClick = async (pokemon) => {
    setSelected(pokemon);
    setLoading(true);
    setOpen(true);
    const headers = await generateAntiFraudHeaders();
    try {
      const res = await fetch(
        holacashApiBaseUrl + "/order",
        {
          method: 'POST',
          headers: {
            "X-Api-Client-Key": PUBLIC_KEY,
            'X-Cash-Anti-Fraud-Metadata': headers,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order_total_amount: {
              amount: 15000,
              currency_code: "MXN",
            },
            description: 'Adopción: ' + pokemon.name.replace(/(^\w|\s\w)/g, m => m.toUpperCase()),
          })
        },
      ).then(response => response.json());

      
      if (res?.order_information?.order_id) {
        // eslint-disable-next-line no-undef
        HolaCashCheckout.configure(
          {
            order_id: res.order_information.order_id,
            // hints are optional
            hints: {
                first_name: 'John',
                last_name: 'Doe',
                second_last_name: 'Doe',
                email: 'john.doe@gmail.com',
                phone: '13212312412'
            },
          },
          {

            // onSuccess happens when a charge is created correctly.
            onSuccess: (res) => {
              setSuccess(true);
              console.log("onSuccess", JSON.parse(res));
            },

            // onAbort happens when the users intentionally close the widget
            onAbort: () => {
              setOpen(false);
              setSelected(null);
              console.log("onAbort callback");
            },

            // onError happens when the holacash service cannot succesfully generate a charge correctly at that moment
            onError: (err) => console.log(JSON.stringify(err)),

            // onEmailEntered is called when the user completes entering an email
            onEmailEntered: (email) => console.log(email),

            // onCheckoutStart is called when the checkout page is presented
            onCheckoutStart: () => console.log('checkout started'),

            // We will use the check callback to determine if Cash Pay should proceed.
            // This must return a boolean
            check: () => {
              return true;
            },
          }
        );
      }
      setLoading(false);
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  const getPokemonDetails = async () => {
    const pokemonDetails = await fetch('https://pokeapi.co/api/v2/pokemon/' + selected.name).then(response => response.json());
    setDetails(pokemonDetails);
  }

  return (
    <Container maxWidth="xl" className="App">
      <header className="App-header">
        <h1 className="title">Adopta un pokemon</h1>
      </header>
      <Grid container spacing={3}>
        {pokemons?.results?.map(pokemon => (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            item
            xs={12}
            sm={6}
            md={6}
            lg={4}
            xl={3}
            key={pokemon.name}
          >
            <Card className="pokeCard">
              <CardMedia
                component="img"
                height="140"
                image={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemon.url.split('/')[pokemon.url.split('/').length-2] + '.png'}
                alt={pokemon.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {pokemon.name.replace(/(^\w|\s\w)/g, m => m.toUpperCase())}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => onClick(pokemon)}>Adóptame</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-checkout-title"
        aria-describedby="alert-checkout-description"
      >
        <DialogTitle id="alert-checkout-title">
          Adoptar a {selected?.name.replace(/(^\w|\s\w)/g, m => m.toUpperCase())}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-checkout-description">
            <b>Adoptar un pokemon es una enorme responsabilidad.</b>
            <br />
            Recuerda también que el proceso de adopción tiene un costo de recuperación de $150.00 MXN
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              setSelected(null);
            }}
          >
            Cancelar
          </Button>
          <Button
            disabled={loading}
            onClick={() => {
              ref.current.click();
              setOpen(false);
              getPokemonDetails();
            }}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={success}
        onClose={() => {
          setSuccess(false);
          setSelected(null);
        }}
        aria-labelledby="alert-success-title"
        aria-describedby="alert-success-description"
      >
        <DialogTitle id="alert-success-title">
          ¡Felicidades!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-success-description">
            Ahora eres el orgulloso dueño de un {selected?.name}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                  <CardMedia
                  component="img"
                  height="140"
                  image={details?.sprites?.front_default}
                  alt={details?.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CardMedia
                  component="img"
                  height="140"
                  image={details?.sprites?.back_default}
                  alt={details?.name}
                />
              </Grid>
            </Grid>
            <b>Más detalles de tu pokemon:</b> <br />
            Experiencia base: {details?.base_experience} <br/>
            Altura: {details?.height} <br/>
            Peso: {details?.weight} <br/> <br/>
            Ven a recoger a tu nuevo pokemon a tu Centro Pokemon más cercano
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={loading}
            onClick={() => {
              setSuccess(false);
              setSelected(null);
            }}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      <div id="instant-holacash-checkout-button" ref={ref} className="checkoutButton">
        <object
          id="checkout-button"
          data={`${holacashApiBaseUrl}/checkout/button?public_key=${PUBLIC_KEY}`}
          data-disabled={loading}
        />
      </div>
    </Container>
  );
}

export default App;
