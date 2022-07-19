import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import '@fullcalendar/react/dist/vdom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useQueryClient } from "react-query";

import ptBRLocale from '@fullcalendar/core/locales/pt-br';
import FullCalendar, { EventInput, EventClickArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

import { Modal } from "../../components/Modal";
import { GenericSelect } from "../../components/Form/GenericSelect";
import { Input } from "../../components/Form/Input";
import { TimeInput } from "../../components/Form/TimeInput";

import { getModalidades } from "../../services/ModalidadeService";
import { getProfessores } from "../../services/ProfessorService";
import {
  atualizarTurma,
  criarTurma,
  excluirTurma,
  getTurmaById,
  getTurmas
} from "../../services/TurmaService";
import { formataHora } from "../../utils/formataData";

// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";

export function CalendarioTurma() {
  const [events, setEvents] = useState<EventInput[]>();
  const { turmas, isFetchingTurmas, errorTurmas } = getTurmas();
  const { modalidades, isFetchingModalidades, errorModalidades } = getModalidades();
  const { professores, isFetchingProfessores, errorProfessores } = getProfessores();

  useEffect(() => {
    const newEvents = turmas?.map(turma => {
      const event: EventInput = {
        id: turma.id.toString(),
        start: new Date(turma.horaInicio.split('.')[0]),
        end: new Date(turma.horaFim.split('.')[0]),
        title: turma.modalidade.descricao,
        color: 'transparent'
      }

      return event;
    })

    setEvents(newEvents);
  }, [turmas])

  if (errorModalidades)
    alert(errorModalidades.message);

  if (errorProfessores)
    alert(errorProfessores.message);

  const [dia, setDia] = useState('');
  const [modalidadeSelected, setModalidadeSelected] = useState('');
  const [inputCapacidade, setInputCapacidade] = useState('');
  const [inputHoraInicio, setInputHoraInicio] = useState('');
  const [inputHoraFim, setInputHoraFim] = useState('');
  const [professorSelected, setProfessorSelected] = useState('');

  const [idTurma, setIdTurma] = useState<number | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const queryClient = useQueryClient();
  const MySwal = withReactContent(Swal);

  const handleDayClick = (arg: DateClickArg) => {
    setDia(arg.dateStr);
    setModalidadeSelected('');
    setInputCapacidade('');
    setInputHoraInicio('');
    setInputHoraFim('');
    setProfessorSelected('');

    setIdTurma(null);
    setModalIsOpen(true);
  }

  const handleEventClick = async (arg: EventClickArg) => {
    const response = await getTurmaById(parseInt(arg.event.id));

    if (response.sucesso) {
      setDia(arg.event.start ? arg.event.start.toISOString().split('T')[0] : "");
      setModalidadeSelected(response.data.modalidadeId.toString());
      setInputCapacidade(response.data.capacidade);
      setInputHoraInicio(formataHora(response.data.horaInicio));
      setInputHoraFim(formataHora(response.data.horaFim));
      setProfessorSelected(response.data.colaboradorId);

      setIdTurma(response.data.id);
      setModalIsOpen(true);
    } else {
      alert(response.mensagem);
    }
  }

  const handleSalvarTurma = async () => {
    if (idTurma) {
      const response = await atualizarTurma({
        id: idTurma,
        modalidadeId: parseInt(modalidadeSelected),
        capacidade: parseInt(inputCapacidade),
        colaboradorId: professorSelected,
        horaFim: dia + 'T' + inputHoraFim + ':00.000Z',
        horaInicio: dia + 'T' + inputHoraInicio + ':00.000Z'
      })

      if (response.sucesso) {
        MySwal.fire({
          title: 'Turma editada!',
          text: 'Cadastro editado com sucesso.',
          showConfirmButton: false,
          icon: 'success',
          timer: 1500
        })

        queryClient.invalidateQueries('turmas');
        setModalIsOpen(false);

      } else {
        alert(response.mensagem);
      }

    } else {
      const response = await criarTurma({
        modalidadeId: parseInt(modalidadeSelected),
        capacidade: parseInt(inputCapacidade),
        colaboradorId: professorSelected,
        horaFim: dia + 'T' + inputHoraFim + ':00.000Z',
        horaInicio: dia + 'T' + inputHoraInicio + ':00.000Z'
      })

      if (response.sucesso) {
        MySwal.fire({
          title: 'Turma cadastrada!',
          text: 'Cadastro realizado com sucesso.',
          showConfirmButton: false,
          icon: 'success',
          timer: 1500
        })

        queryClient.invalidateQueries('turmas');
        setModalIsOpen(false);

      } else {
        alert(response.mensagem);
      }
    }
  }

  return (
    <>
      <Helmet title='Turmas - Pocket Fitness Club' />
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-slate-800">Turmas</h2>
        <small className="text-slate-600">
          <Link className="hover:underline hover:underline-offset-1" to="/">Home</Link> / <span className="underline underline-offset-1">Calendário de Turmas</span>
        </small>
      </div>

      <div className="card">
        <FullCalendar
          dayCellClassNames="cursor-pointer"
          eventClassNames="cursor-pointer"
          plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
          events={events}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          locale={ptBRLocale}
          views={{
            prev: { buttonText: 'Anterior' },
            next: { buttonText: 'Próximo' },
            today: { buttonText: 'Hoje' },
            dayGridMonth: { buttonText: 'Mês' },
            dayGridWeek: { buttonText: 'Semana' },
            dayGridDay: { buttonText: 'Dia' },
            listMonth: { buttonText: 'Lista' }
          }}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay,listMonth'
          }}
          dateClick={handleDayClick}
          eventContent={(eventInfo) => (
            <div className="flex gap-1 items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <b>{eventInfo.event.start?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</b>
              <i>{eventInfo.event.title}</i>
            </div>
          )}
          eventClick={handleEventClick}
        />
      </div>

      <Modal
        open={modalIsOpen}
        setIsOpen={setModalIsOpen}
        onConfirm={handleSalvarTurma}
        title="Turma"
        id={dia ? dia.split("-").reverse().join("/") : null}
      >
        <div className="lg:flex lg:gap-5">
          <div className="w-full mb-3 lg:w-2/3 lg:mb-0">
            <GenericSelect
              options={modalidades ?? []}
              name="Modalidade"
              label="descricao"
              value="id"
              setInput={setModalidadeSelected}
              selected={modalidadeSelected}
              loading={isFetchingModalidades}
            />
          </div>

          <div className="w-full lg:w-1/3">
            <Input
              type="number"
              label="Capacidade"
              setInput={setInputCapacidade}
              value={inputCapacidade}
            />
          </div>
        </div>

        <div className="lg:flex lg:gap-5">
          <TimeInput
            label="Hora Início"
            setInput={setInputHoraInicio}
            value={inputHoraInicio}
            placeholder="00:00"
          />

          <TimeInput
            label="Hora Fim"
            setInput={setInputHoraFim}
            value={inputHoraFim}
            placeholder="00:00"
          />
        </div>

        <GenericSelect
          options={professores ?? []}
          name="Professor"
          label="nome"
          value="id"
          setInput={setProfessorSelected}
          selected={professorSelected}
          loading={isFetchingProfessores}
        />
      </Modal>
    </>
  );
}