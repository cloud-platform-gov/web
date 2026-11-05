"use client"

import Link from "next/link"
import { useActionState, useState } from "react"
import { PlusIcon, Trash2Icon } from "lucide-react"

import { createServiceAction, updateServiceAction } from "@/app/actions/catalog"
import { initialActionState } from "@/lib/action-state"
import {
  MIME_TYPES,
  type MimeType,
  type Requirement,
  type ServiceDetail,
} from "@/lib/api/types"
import { MIME_LABEL } from "@/lib/format"
import { FormMessage } from "@/components/app/form-message"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

const MAX_REQUIREMENTS = 20
const MB = 1024 * 1024

type RequirementDraft = {
  key: number
  name: string
  description: string
  required: boolean
  acceptedMimeTypes: MimeType[]
  maxSizeMb: string
}

let nextKey = 0
function toDraft(req?: Requirement): RequirementDraft {
  return {
    key: nextKey++,
    name: req?.name ?? "",
    description: req?.description ?? "",
    required: req?.required ?? true,
    acceptedMimeTypes: req?.acceptedMimeTypes ?? ["application/pdf"],
    maxSizeMb: String(req ? +(req.maxSizeBytes / MB).toFixed(2) : 5),
  }
}

export function ServiceForm({ service }: { service?: ServiceDetail }) {
  const editing = Boolean(service)
  const [state, action, pending] = useActionState(
    editing ? updateServiceAction : createServiceAction,
    initialActionState
  )
  const [code, setCode] = useState(service?.code ?? "")
  const [name, setName] = useState(service?.name ?? "")
  const [description, setDescription] = useState(service?.description ?? "")
  const [department, setDepartment] = useState(service?.department ?? "")
  const [slaDays, setSlaDays] = useState(String(service?.slaDays ?? 15))
  const [requirements, setRequirements] = useState<RequirementDraft[]>(
    () => service?.requirements.map(toDraft) ?? []
  )
  const errors = state.fieldErrors ?? {}

  const payload = JSON.stringify({
    ...(editing ? {} : { code: code.trim().toLowerCase() }),
    name: name.trim(),
    description: description.trim(),
    department: department.trim(),
    slaDays: Number(slaDays),
    requirements: requirements.map((r) => ({
      name: r.name.trim(),
      ...(r.description.trim() ? { description: r.description.trim() } : {}),
      required: r.required,
      acceptedMimeTypes: r.acceptedMimeTypes,
      maxSizeBytes: Math.round(Number(r.maxSizeMb) * MB),
    })),
  })

  function update(key: number, patch: Partial<RequirementDraft>) {
    setRequirements((list) =>
      list.map((r) => (r.key === key ? { ...r, ...patch } : r))
    )
  }

  function err(...keys: string[]) {
    return keys.map((k) => errors[k]).find(Boolean)
  }

  return (
    <form action={action} className="flex flex-col gap-6">
      <input type="hidden" name="payload" value={payload} />
      {service && <input type="hidden" name="id" value={service.id} />}
      <FormMessage message={state.message} />

      <Card>
        <CardHeader>
          <CardTitle>Dados do serviço</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field data-invalid={Boolean(err("code"))}>
                <FieldLabel htmlFor="code">Código</FieldLabel>
                <Input
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  readOnly={editing}
                  disabled={editing}
                  required
                  minLength={3}
                  maxLength={64}
                  pattern="[a-z0-9]+(-[a-z0-9]+)*"
                  placeholder="emissao-de-rg"
                  className="font-mono"
                />
                <FieldDescription>
                  {editing
                    ? "O código não pode ser alterado."
                    : "Letras minúsculas, números e hífens."}
                </FieldDescription>
                <FieldError>{err("code")}</FieldError>
              </Field>
              <Field data-invalid={Boolean(err("department"))}>
                <FieldLabel htmlFor="department">Órgão responsável</FieldLabel>
                <Input
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                  minLength={3}
                  maxLength={128}
                />
                <FieldError>{err("department")}</FieldError>
              </Field>
            </div>
            <div className="grid gap-6 sm:grid-cols-[1fr_10rem]">
              <Field data-invalid={Boolean(err("name"))}>
                <FieldLabel htmlFor="name">Nome</FieldLabel>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  minLength={3}
                  maxLength={255}
                />
                <FieldError>{err("name")}</FieldError>
              </Field>
              <Field data-invalid={Boolean(err("slaDays"))}>
                <FieldLabel htmlFor="slaDays">Prazo (dias)</FieldLabel>
                <Input
                  id="slaDays"
                  type="number"
                  value={slaDays}
                  onChange={(e) => setSlaDays(e.target.value)}
                  required
                  min={1}
                  max={180}
                  step={1}
                />
                <FieldError>{err("slaDays")}</FieldError>
              </Field>
            </div>
            <Field data-invalid={Boolean(err("description"))}>
              <FieldLabel htmlFor="description">Descrição</FieldLabel>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                minLength={10}
                maxLength={2000}
                rows={5}
              />
              <FieldError>{err("description")}</FieldError>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Documentos exigidos</CardTitle>
          <CardDescription>
            {requirements.length}/{MAX_REQUIREMENTS} documentos.
          </CardDescription>
          <CardAction>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={requirements.length >= MAX_REQUIREMENTS}
              onClick={() => setRequirements((list) => [...list, toDraft()])}
            >
              <PlusIcon data-icon="inline-start" />
              Adicionar
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <FieldError>{err("requirements")}</FieldError>
          {requirements.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Nenhum documento exigido.
            </p>
          )}
          {requirements.map((req, index) => {
            const e = (field: string) =>
              err(
                `requirements[${index}].${field}`,
                `requirements.${index}.${field}`
              )
            return (
              <FieldSet key={req.key} className="rounded-2xl border p-4">
                <div className="flex items-center justify-between">
                  <FieldLegend variant="label">
                    Documento {index + 1}
                  </FieldLegend>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Remover documento ${index + 1}`}
                    onClick={() =>
                      setRequirements((list) =>
                        list.filter((r) => r.key !== req.key)
                      )
                    }
                  >
                    <Trash2Icon />
                  </Button>
                </div>
                <FieldGroup className="gap-4">
                  <div className="grid gap-4 sm:grid-cols-[1fr_9rem]">
                    <Field data-invalid={Boolean(e("name"))}>
                      <FieldLabel htmlFor={`req-name-${req.key}`}>
                        Nome
                      </FieldLabel>
                      <Input
                        id={`req-name-${req.key}`}
                        value={req.name}
                        onChange={(ev) =>
                          update(req.key, { name: ev.target.value })
                        }
                        required
                        minLength={3}
                        maxLength={100}
                      />
                      <FieldError>{e("name")}</FieldError>
                    </Field>
                    <Field data-invalid={Boolean(e("maxSizeBytes"))}>
                      <FieldLabel htmlFor={`req-size-${req.key}`}>
                        Tamanho máx. (MB)
                      </FieldLabel>
                      <Input
                        id={`req-size-${req.key}`}
                        type="number"
                        value={req.maxSizeMb}
                        onChange={(ev) =>
                          update(req.key, { maxSizeMb: ev.target.value })
                        }
                        required
                        min={0.001}
                        max={10}
                        step="any"
                      />
                      <FieldError>{e("maxSizeBytes")}</FieldError>
                    </Field>
                  </div>
                  <Field data-invalid={Boolean(e("description"))}>
                    <FieldLabel htmlFor={`req-desc-${req.key}`}>
                      Descrição (opcional)
                    </FieldLabel>
                    <Input
                      id={`req-desc-${req.key}`}
                      value={req.description}
                      onChange={(ev) =>
                        update(req.key, { description: ev.target.value })
                      }
                      maxLength={500}
                    />
                    <FieldError>{e("description")}</FieldError>
                  </Field>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                    <span className="text-sm font-medium">Formatos:</span>
                    {MIME_TYPES.map((mime) => (
                      <Field
                        key={mime}
                        orientation="horizontal"
                        className="w-auto"
                      >
                        <Checkbox
                          id={`req-${req.key}-${mime}`}
                          checked={req.acceptedMimeTypes.includes(mime)}
                          onCheckedChange={(checked) =>
                            update(req.key, {
                              acceptedMimeTypes: checked
                                ? [...req.acceptedMimeTypes, mime]
                                : req.acceptedMimeTypes.filter(
                                    (m) => m !== mime
                                  ),
                            })
                          }
                        />
                        <FieldLabel
                          htmlFor={`req-${req.key}-${mime}`}
                          className="font-normal"
                        >
                          {MIME_LABEL[mime]}
                        </FieldLabel>
                      </Field>
                    ))}
                    <Field orientation="horizontal" className="ms-auto w-auto">
                      <Switch
                        id={`req-required-${req.key}`}
                        checked={req.required}
                        onCheckedChange={(checked) =>
                          update(req.key, { required: checked })
                        }
                      />
                      <FieldLabel
                        htmlFor={`req-required-${req.key}`}
                        className="font-normal"
                      >
                        Obrigatório
                      </FieldLabel>
                    </Field>
                  </div>
                  <FieldError>{e("acceptedMimeTypes")}</FieldError>
                </FieldGroup>
              </FieldSet>
            )
          })}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Link
          href="/admin/services"
          className={buttonVariants({ variant: "outline" })}
        >
          Cancelar
        </Link>
        <Button type="submit" disabled={pending}>
          {pending && <Spinner />}
          {editing ? "Salvar alterações" : "Criar serviço"}
        </Button>
      </div>
    </form>
  )
}
