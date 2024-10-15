const developerJokes = [ "¿Por qué los desarrolladores odian la naturaleza? Porque tiene demasiados bugs.", "Un SQL entra en un bar, se acerca a dos mesas y pregunta: '¿Puedo unirme?'", "¡He terminado mi código a tiempo! – Nadie, nunca.", "Si no funciona, añade más `console.log()`.", "¿Cuántos programadores se necesitan para cambiar una bombilla? Ninguno, es un problema de hardware.", "No me asusto fácilmente... excepto cuando veo código sin `;` al final.", "Los desarrolladores no envejecen, solo se depuran.", "El único lugar donde puedes escapar de una excepción es en Java.", "Frontend sin diseño es como un backend sin lógica.", "¿Por qué los programadores prefieren el té? Porque en Java no hay café.", "Hay 10 tipos de personas en el mundo: las que entienden binario y las que no.", "Siempre prueba tu código... excepto cuando funciona.", "Tu código no está roto, solo es 'funcionalidad no documentada'.", "En qué se parecen los programadores y los gatos? En que odian mojarse y no pueden dejar de jugar con cosas que no deberían.", "Mi código funciona... hasta que lo toco de nuevo.", "¿Por qué los desarrolladores odian la luz del sol? Porque depuran en la oscuridad.", "Cuando crees que has eliminado todos los bugs, aparece el 'bug final'.", "Git es como un horóscopo: nunca entiendes los conflictos.", "Un desarrollador sin bugs es como un unicornio, no existe.", "En mi máquina funciona... pero no en producción." ];

const handler = async (req: Request): Promise<Response> => {
    const method = req.method;
    const url = new URL(req.url);
    const path = url.pathname;

    if(method==="GET"){
        if(path === "/jokes"){
            const indice = url.searchParams.get("indice");
            if(!indice){
                let j =  Math.floor(Math.random() * developerJokes.length);
                let ranJoke = developerJokes[j]
			    return new Response(JSON.stringify(ranJoke))
            }else{
                return new Response(JSON.stringify(developerJokes[indice]))
            }
            			
        }else if(path==="/calcular"){
            const num1 = Number(url.searchParams.get("num1"))
            const num2 = Number(url.searchParams.get("num2"))
            const operacion = url.searchParams.get("operacion");

            if(!num1 || !num2 || !operacion) return new Response("Bad Request")

            if(operacion === "sumar"){
                const respuestaSuma = num1+num2
                return new Response(JSON.stringify(respuestaSuma))
            }else if(operacion === "resta"){
                const respuestaResta = num1-num2
                return new Response(JSON.stringify(respuestaResta))
            }else if(operacion === "multiplicacion"){
                const respuestaMult = num1*num2
                return new Response(JSON.stringify(respuestaMult))
            }else if(operacion === "division"){
                if(num2 === 0) return new Response("Error: No se puede dividir por 0")
                const respuestaDiv = num1/num2
                return new Response(JSON.stringify(respuestaDiv))
            }else {
                return new Response("Bad")
            }
        }else if(path.startsWith("/reverso")){
            const detalles = Boolean(url.searchParams.get("detalles"))
            let palabra = path.slice(9);
            const fraseInvertida = palabra.split('').reverse().join(''); 
            
            if(!detalles){
                return new Response(JSON.stringify(fraseInvertida))
            }
            return new Response(JSON.stringify({
                "reverso": fraseInvertida,
                "": fraseInvertida.length
            }))

            

        }
        return new Response ("BAD")
    }
    return new Response("BAD")
}
  
  Deno.serve({ port: 3000 }, handler);