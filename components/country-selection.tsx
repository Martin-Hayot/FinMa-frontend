"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useLinkStore } from "@/store/useLink";

const countries = [
    { name: "Belgium", code: "BE", logo: "/554px-Flag_of_Belgium.png" },
];

const CountrySelection = () => {
    const [selectedCountry, setSelectedCountry] = useState("");
    const { setCountryCode } = useLinkStore();

    return (
        <div>
            <h2>Select your country</h2>
            <div className="my-4">
                <Input
                    type="text"
                    placeholder="Enter country name"
                    onChange={(e) => setSelectedCountry(e.target.value)}
                />
            </div>
            {countries
                .filter((country) =>
                    country.name
                        .toLowerCase()
                        .includes(selectedCountry.toLowerCase())
                )
                .map((country) => (
                    <Button
                        key={country.code}
                        variant={"outline"}
                        className="flex items-center mb-2 h-16 justify-start px-4"
                        onClick={() => {
                            setCountryCode(country.code);
                        }}
                    >
                        <Image
                            src={country.logo}
                            alt={`${country.name} logo`}
                            width={50}
                            height={50}
                            className="w-8 h-6 mr-2"
                        />
                        <span className="text-md">{country.name}</span>
                    </Button>
                ))}
        </div>
    );
};

export default CountrySelection;
