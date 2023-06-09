import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    /*
     Esto es una dependencia oculta, lo ideal es esclarecerla para que no quede dudas,
     para ello podemos utilizar un private readonly axios: AxiosInstance = axios;
     entonces podemos utilizar this.axios, de esta forma queda claro de que estamos
     trabajando con una instancia de axios.
    */
    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=1');

    data.results.forEach(({name, url}) => {
      const segments = url.split('/');
      const no:number = +segments[ segments.length - 2];

      console.log(name, no)
    })

    return data.results;
  }

}
