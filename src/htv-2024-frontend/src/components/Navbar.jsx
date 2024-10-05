import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import {Button, ButtonGroup} from "@nextui-org/button";

export default function Navigation() {
    return (
        <Navbar className="flex flex-wrap">
            <NavbarContent className="hidden sm:flex gap-10" justify="center">
                <NavbarItem>
                    <Link href={`/home`}>
                        <div  className="text-lg font-semibold"> Home </div>
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href={`/randomroute`} aria-current="page">
                        Spotlight
                    </Link>
                </NavbarItem>
            </NavbarContent>
      </Navbar>
    );
}