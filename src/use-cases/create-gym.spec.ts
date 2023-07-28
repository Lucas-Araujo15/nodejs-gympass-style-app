import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "./create-gym";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "JavaScript Gym",
      latitude: -23.56386301508834,
      longitude: -46.65233285830718,
      description: null,
      phone: null,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
