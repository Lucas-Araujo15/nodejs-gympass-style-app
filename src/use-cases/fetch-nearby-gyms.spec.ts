import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch Nearby Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      latitude: -23.5668670350834,
      longitude: -46.64940723204545,
      description: null,
      phone: null,
    });

    await gymsRepository.create({
      title: "Far Gym",
      latitude: -23.552789667977585,
      longitude: -46.83755583204568,
      description: null,
      phone: null,
    });

    const { gyms } = await sut.execute({
      userLatitude: -23.56386301508834,
      userLongitude: -46.65233285830718,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
