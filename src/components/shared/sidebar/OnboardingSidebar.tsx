"use client";

import { Check } from "lucide-react";
import { Logo, Text } from "@/src/components";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/src/components/ui/sidebar";
import { cn } from "@/src/lib/utils/cn";

export interface IStepperStep {
  id: number;
  label: string;
}

interface IOnboardingSidebarProps {
  steps: IStepperStep[];
  currentStep: number;
  onStepSelect: (step: number) => void;
}

const OnboardingSidebar = ({
  steps,
  currentStep,
  onStepSelect,
}: IOnboardingSidebarProps) => {
  const { setOpenMobile } = useSidebar();
  const progress = (currentStep / steps.length) * 100;

  const handleSelect = (step: number) => {
    onStepSelect(step);
    setOpenMobile(false);
  };

  return (
    <Sidebar className="border-project-border">
      <SidebarHeader className="h-18 justify-center border-b border-project-border px-4">
        <Logo href="/" />
      </SidebarHeader>

      <SidebarContent className="py-4">
        <SidebarGroup className="px-0">
          <SidebarGroupLabel className="px-4 uppercase tracking-[0.28em] text-project-primary">
            Technician setup
          </SidebarGroupLabel>

          <SidebarMenu className="gap-0.5">
            {steps.map((step) => {
              const isActive = step.id === currentStep;
              const isDone = step.id < currentStep;

              return (
                <SidebarMenuItem key={step.id}>
                  <SidebarMenuButton
                    isActive={isActive}
                    disabled={!isDone}
                    onClick={() => handleSelect(step.id)}
                    className="relative h-12 px-4 font-medium text-project-muted-foreground transition-colors duration-300 hover:bg-project-muted-primary/50 hover:text-project-accent data-[active=true]:bg-project-muted-primary data-[active=true]:font-semibold data-[active=true]:text-project-primary"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute left-0 top-0 h-full w-0.5 origin-top bg-project-primary transition-transform duration-300",
                        isActive ? "scale-y-100" : "scale-y-0",
                      )}
                    />

                    <span
                      className={cn(
                        "flex size-6 shrink-0 items-center justify-center border text-xs font-semibold transition-colors duration-300",
                        isActive &&
                          "border-project-primary bg-project-primary text-project-primary-foreground",
                        isDone &&
                          "border-project-primary bg-project-muted-primary text-project-primary",
                        !isActive &&
                          !isDone &&
                          "border-project-border text-project-muted-foreground",
                      )}
                    >
                      {isDone ? <Check className="size-3.5" /> : step.id}
                    </span>

                    <span className="truncate">{step.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="gap-2 border-t border-project-border p-4">
        <Text
          variant="medium-xs"
          as="span"
          className="text-project-muted-foreground"
        >
          Step {currentStep} of {steps.length}
        </Text>

        <span aria-hidden className="block h-0.5 w-full bg-project-border">
          <span
            className="block h-full bg-project-primary transition-[width] duration-500"
            style={{ width: `${progress}%` }}
          />
        </span>
      </SidebarFooter>
    </Sidebar>
  );
};

export default OnboardingSidebar;
