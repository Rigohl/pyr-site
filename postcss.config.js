// src/app/api/contact/route.ts

import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase'; // Importamos la conexión a la DB
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Define una interfaz para los datos del formulario
interface ContactPayload {
    name: string;
    email: string;
    message: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactPayload = await request.json();
    const { name, email, message } = body;

    // Validación simple en el servidor
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Todos los campos son requeridos.' }, { status: 400 });
    }

    // Guardar el documento en una colección llamada 'contacts'
    const docRef = await addDoc(collection(db, "contacts"), {
      name: name,
      email: email,
      message: message,
      createdAt: serverTimestamp() // Agrega una marca de tiempo del servidor
    });

    console.log("Documento guardado en Firestore con ID: ", docRef.id);

    // Enviar una respuesta de éxito
    return NextResponse.json({ success: true, message: "Mensaje recibido con éxito.", contactId: docRef.id });

  } catch (error) {
    console.error("Error al guardar en Firestore:", error);
    return NextResponse.json({ error: 'Hubo un error en el servidor.' }, { status: 500 });
  }
}