import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>
  ) { }
  async executeSeed() {
    /*
     Esto es una dependencia oculta, lo ideal es esclarecerla para que no quede dudas,
     para ello podemos utilizar un private readonly axios: AxiosInstance = axios;
     entonces podemos utilizar this.axios, de esta forma queda claro de que estamos
     trabajando con una instancia de axios.
    */
    const pokemons = 10;

    try {
      const { data } = await this.axios.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=${pokemons}`);
      data.results.forEach(({ name, url }) => {
        const segments = url.split('/');
        const no: number = +segments[segments.length - 2];

        this.pokemonModel.create({ name, no });
      });
      return `${pokemons} pokemons has been created successfully`;
    } catch ({ message }) {
      return { message }
    }

  }

}
