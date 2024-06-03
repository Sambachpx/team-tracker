"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";
import FormInput from "@/components/FormInput";
import { playerFormSchema } from "@/utils/zod/player";
import type { TPlayerFormFields } from "@/utils/zod/player";
import { useEffect, useState } from "react";
import type { Team } from "@prisma/client";
import { addPlayer } from "./actions";
import { getTeams } from "../team/actions";

export default function PlayerForm() {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsData = await getTeams();
        setTeams(teamsData);
      } catch (error) {
        console.error("Error fetching teams:", error);
        toast.error("Failed to load teams");
      }
    };

    fetchTeams().catch((e) => console.error("error fetching teams:", e));
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TPlayerFormFields>({ resolver: zodResolver(playerFormSchema) });

  const onSubmit = async (data: TPlayerFormFields) => {
    console.log(data);
    try {
      await addPlayer(data);
      toast.success("player added successfully");
      reset();
    } catch (error) {
      if (error instanceof Error) {
        console.error("error adding player:", error);
        toast.error(error.message);
      } else console.error("an error occurred during the player registration process", error);
      toast.error("an error occurred during the player registration process");
    }
  };

  return (
    <div>
      <Toaster position="bottom-right" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Name"
          type="text"
          name="firstName"
          id="name"
          placeholder="First Name"
          register={register}
          error={errors.firstName?.message}
        />

        <FormInput
          label="Name"
          type="text"
          name="lastName"
          id="name"
          placeholder="Last Name"
          register={register}
          error={errors.lastName?.message}
        />

        <FormInput
          label="Salary"
          type="number"
          name="salary"
          id="salary"
          placeholder="Salary"
          register={register}
          error={errors.salary?.message}
        />

        <select name="team" id="team-select">
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>

        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "adding player..." : "add Player"}
        </button>
      </form>
    </div>
  );
}
