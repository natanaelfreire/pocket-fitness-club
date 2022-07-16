import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../../components/Form/Input";
import { PhoneInput } from "../../components/Form/PhoneInput";

import { Building } from '@styled-icons/fa-solid/Building';
import { MapMarkerAlt } from '@styled-icons/fa-solid/MapMarkerAlt';
import { TimeFive } from '@styled-icons/boxicons-regular/TimeFive';
import { Telephone } from '@styled-icons/bootstrap/Telephone';
import { Facebook } from '@styled-icons/boxicons-logos/Facebook';
import { Instagram } from '@styled-icons/boxicons-logos/Instagram';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { carregarInformacoesClube, salvarInformacoesClube } from "../../services/InformacoesClubeService";

export function InformacoesClube() {
  const [inputNome, setInputNome] = useState('');
  const [inputEndereco, setInputEndereco] = useState('');
  const [inputHorarios, setInputHorarios] = useState('');
  const [inputTelefone, setInputTelefone] = useState('');
  const [inputFacebook, setInputFacebook] = useState('');
  const [inputInstagram, setInputInstagram] = useState('');

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    carregarInfos();

  }, [])

  const salvarInfos = async () => {
    const response = await salvarInformacoesClube({
      nome: inputNome,
      endereco: inputEndereco,
      horarios: inputHorarios,
      telefone: inputTelefone,
      facebook: inputFacebook,
      instagram: inputInstagram
    })

    if (response.sucesso) {
      MySwal.fire({
        title: 'Informações salvas!',
        text: 'Informações foram salvas com sucesso.',
        confirmButtonText: 'Ok',
        icon: 'success'
      })

      await carregarInfos()
    }
    else {
      MySwal.fire({
        title: 'Algo deu errado.',
        text: response.mensagem,
        confirmButtonText: 'Ok',
        icon: 'warning'
      })
    }
    
  }

  const carregarInfos = async () => {
    const response = await carregarInformacoesClube();

    if (response.data) {
      setInputNome(response.data.nome)
      setInputEndereco(response.data.endereco)
      setInputHorarios(response.data.horarios)
      setInputTelefone(response.data.telefone)
      setInputFacebook(response.data.facebook)
      setInputInstagram(response.data.instagram)
    }
  }

  return (
    <>
      <Helmet title='Infos - Pocket Fitness Club' />
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-slate-800">Informações do Clube</h2>
        <small className="text-slate-600">
          <Link className="hover:underline hover:underline-offset-1" to="/">Home</Link> / <span className="underline underline-offset-1">Informações do Clube</span>
        </small>
      </div>
      

      <div className="card">
        <Input 
          setInput={setInputNome} 
          value={inputNome}
          label="Nome" 
          type="text" 
          placeholder="Nome da academia" 
          Icone={Building} 
        />
        <Input 
          setInput={setInputEndereco} 
          value={inputEndereco}
          label="Endereço" type="text" 
          placeholder="Rua da sua academia, 12345 - Sobral - CE" 
          Icone={MapMarkerAlt} 
        />
        <div className="lg:flex lg:gap-5">
            <Input 
              setInput={setInputHorarios} 
              value={inputHorarios}
              label="Dias e horários de funcionamento" 
              type="text" 
              Icone={TimeFive} 
            />
            <PhoneInput 
              setInput={setInputTelefone} 
              value={inputTelefone}
              label="Telefone" 
              placeholder="(00) 00000-0000" 
              Icone={Telephone} 
            />
        </div>
        <div className="lg:w-1/2 lg:pr-2 mb-7">
          <Input 
            setInput={setInputFacebook} 
            value={inputFacebook}
            label="Redes sociais" 
            type="text" 
            placeholder="facebook.com/sua_academia" 
            Icone={Facebook} 
          />
          <Input 
            setInput={setInputInstagram} 
            value={inputInstagram}
            label="" 
            type="text" 
            placeholder="instagram.com/sua_academia" 
            Icone={Instagram} 
          />
        </div>

        <button
          onClick={salvarInfos}
          className="bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 transition-colors font-semibold text-white shadow-sm rounded-md px-5 py-2 outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-1 ring-offset-white"
        >
          Salvar
        </button>
      </div>
    </>
  );
}