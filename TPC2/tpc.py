import json

with open("mapa1.json", encoding="utf-8") as f:
    mapa = json.load(f)

cidades = mapa["cidades"]
cidades.sort(key = lambda x: x["nome"] )

ligacoes = {}
codigos ={}
for c in cidades:
    codigos[c["id"]] = c["nome"]
for lig in mapa["ligações"]:
    if lig["origem"] not in ligacoes: ligacoes[lig["origem"]]=[]
    ligacoes[lig["origem"]].append((lig["destino"],lig["distância"]))
    
pagHTML = """
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1 class="titulo">Mapa Virtual</h1>
        <table>
            <tr>
                    <a name=indice></a>
                    <h3>Indice</h3>
                <ol>
"""
for c in cidades:
    pagHTML += f"""<li><a href={c["id"]}.html>{c["nome"]}</a>
                        </li>"""
""" </ol> </tr> </table>
    </body>
</html>"""

with open("index.html", "w") as ind:
    ind.write(pagHTML)
  
for c in cidades:
    pagHTMLC = """
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Mapa Virtual</title>
                    <meta charset="utf-8"/>
                </head>
                <body>
                    <h1 class="titulo">Mapa Virtual</h1>
                    <table>
        """
    pagHTMLC += f"""
                
                    <h3><a name={c["id"]}>{c["nome"]}</a></h3>
                    <p><b>Distrito:</b> {c["distrito"]}</p>
                    <p><b>População:</b> {c["população"]}</p>
                    <p><b>Descrição:</b> {c["descrição"]}</p>
                    <dl>"""
                   
    if (c["id"] in ligacoes):
        pagHTMLC +=  """<dt><p><b>Ligações:</b></dt>
                    <dd>
                        <ol>"""
        for lig in ligacoes[c["id"]]:
            pagHTMLC+=f"<li><a href={lig[0]}.html>{codigos[lig[0]]}</a>:{lig[1]}</li>"
        pagHTMLC +=" </ol> </dd>"
    pagHTMLC +="""   
                    </dl>
                    <adress><a href=index.html> Voltar ao indice</a></adress>
                    <center>
                        <hr width="80%"/>
                    </center>
            """
    pagHTMLC+="""</table>
                </body>
                </html>"""
    with open(c["id"] + ".html", "w") as city:
        city.write(pagHTMLC)
        