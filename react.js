import React, { useContext, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { BiMinus } from "react-icons/bi";
import FlightForm from "./FlightForm";
import TicketForm from "./TicketForm";
import { useMutation, useQueryClient } from "react-query";
import { AdminContext } from "../../context/AdminContext";
import FlightServices from "../../services/FlightService";
import { notifyError, notifySuccess } from "../../utils/toast";

function Flights() {
  const [showForm, setShowForm] = useState(false);
  const {
    tickets,
    setTickets,
    transit,
    setTransit,
    goValues,
    setGoValues,
    coValues,
    setCoValues,
    clearFligts,
  } = useContext(AdminContext);

  const queryClient = useQueryClient();

  const postFlightMutate = useMutation(
    (obj) =>
      FlightServices.postFlight(obj).then((res) => {
        if (res) {
          notifySuccess("Reys muvaffaqiyatli qo'shildi");
        } else {
          notifyError("Reys qo'shilmadi");
        }
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("flights");
      },
    }
  );

  const goingFlightForm = transit.going.map((_, i) => {
    const label = `Jo'nab ketishda Tranzit ${i + 1}`;
    if (transit.going.length - 1 === i) {
      return (
        <FlightForm
          key={i}
          label={label}
          labelButton="O'chirish"
          values={goValues}
          setValues={setGoValues}
          onClick={() => deleteTransit("going", i)}
        />
      );
    }
    return (
      <FlightForm
        key={i}
        label={label}
        values={goValues}
        setValues={setGoValues}
      />
    );
  });

  const comingFlightForm = transit.coming.map((_, i) => {
    const label = `Qaytib kelishda Tranzit ${i + 1}`;
    if (transit.coming.length - 1 === i) {
      return (
        <FlightForm
          key={i}
          label={label}
          labelButton="O'chirish"
          values={coValues}
          setValues={setCoValues}
          onClick={() => deleteTransit("coming", i)}
        />
      );
    }
    return (
      <FlightForm
        key={i}
        label={label}
        values={coValues}
        setValues={setCoValues}
      />
    );
  });

  const addTransit = (id) => {
    const obj = { ...transit };
    let values = id === "going" ? goValues : coValues;

    obj[id] = [...obj[id], values];

    values = {
      airline: "",
      flightName: "",
      flightWay: "",
      flightDate: "",
      flightTime: "",
      reachTime: "",
    };

    if (id === "going") {
      setGoValues(values);
    } else if (id === "coming") {
      setCoValues(values);
    }

    setTransit(obj);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = { ...transit };
    obj.going.push(goValues);
    obj.coming.push(coValues);
    Object.assign(obj.tickets, tickets);
    postFlightMutate.mutate(obj);
    clearFligts();
    setTimeout(() => {
      const clearButton = document.getElementById("reset");
      clearButton.click();
    }, 500);
  };

  const deleteTransit = (buttonId, i) => {
    const obj = { ...transit };
    if (buttonId === "going") {
      obj.going.splice(i, 1);
    } else if (buttonId === "coming") {
      obj.coming.splice(i, 1);
    }
    setTransit(obj);
  };
  return (
    <div className="grid gap-8 col-span-6">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl">Reyslar</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="gap-1 font-semibold py-2 px-4 bg-blue flex flex-row items-center justify-center focus:ring-2 focus:ring-blue focus:ring-offset-1 text-white rounded-2xl col-span-2"
        >
          {showForm ? (
            <BiMinus className=" text-2xl font-semibold" />
          ) : (
            <IoMdAdd className=" text-2xl font-semibold" />
          )}
          <span>Reys qo'shish</span>
        </button>
      </div>
      {showForm ? (
        <form
          className=" grid grid-cols-12 gap-6 p-6 bg-white rounded-2xl"
          onSubmit={handleSubmit}
        >
          <FlightForm
            label="Jo'nab ketish"
            values={goValues}
            setValues={setGoValues}
          />
          {goingFlightForm}
          <div className="col-span-7"></div>
          <button
            className="gap-1 font-semibold p-2 bg-blue flex flex-row items-center justify-center focus:ring-2 focus:ring-blue focus:ring-offset-1 text-white rounded-2xl col-span-2"
            onClick={() => addTransit("going")}
            type="button"
          >
            <IoMdAdd className=" text-2xl font-semibold" />
            <span>Tranzit</span>
          </button>
          <div className=" h-px w-full bg-grey col-span-12"></div>
          <FlightForm
            label="Qaytib kelish"
            values={coValues}
            setValues={setCoValues}
          />
          {comingFlightForm}
          <div className="col-span-7"></div>
          <button
            className="gap-1 font-semibold p-2 bg-blue flex flex-row items-center justify-center focus:ring-2 focus:ring-blue focus:ring-offset-1 text-white rounded-2xl col-span-2"
            type="button"
            onClick={() => addTransit("coming")}
          >
            <IoMdAdd className=" text-2xl font-semibold" />
            <span>Tranzit</span>
          </button>
          <div className=" h-px w-full bg-grey col-span-12"></div>
          <TicketForm
            label="Chiptalar"
            labelButton="O'chirish"
            values={tickets}
            setValues={setTickets}
          />
          <div className="grid col-span-12 grid-cols-12 gap-4 ">
            <div className="col-span-5"></div>
            <button
              id="reset"
              className="p-2 bg-backGray focus:ring-2 focus:ring-offset-1 focus:ring-backGray text-white rounded-2xl col-span-2"
              type="reset"
            >
              Bekor Qilish
            </button>
            <button
              className="p-2 bg-blue focus:ring-2 focus:ring-offset-1 focus:ring-blue text-white rounded-2xl col-span-2"
              type="submit"
            >
              Saqlash
            </button>
          </div>
        </form>
      ) : (
        ""
      )}
    </div>
  );
}

export default Flights;
