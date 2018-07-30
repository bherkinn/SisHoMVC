<?php 
	require_once("conexion.php");

	Class Socket extends Conexion
	{	
		public function MostrarDatosFila($fila)
	    {
	        try {
	            $this->Conectar(1);
	            $this->memoria = $this->con1->query("SELECT * FROM basehorarios where idHorarios=$fila");
	            
	            $datos = $this->memoria->fetchAll(PDO::FETCH_OBJ);
	            $this->Close(1);
	            
	            return $datos;
	        }
	        catch (Exception $e) {
	            echo "error " . $e->getMessage();
	        }
	    }

		public function HorarioDocente($codDocente,$periodo)
	    {
	        try {
	            $this->Conectar(1);
	            $this->memoria = $this->con1->query("SELECT horariosfim.basehorarios.*,oeraae2018.docentes.apePaterno,oeraae2018.docentes.celular,oeraae2018.docentes.telefono,oeraae2018.docentes.apeMaterno,oeraae2018.docentes.nombres from horariosfim.basehorarios INNER JOIN oeraae2018.docentes ON horariosfim.basehorarios.codDocente=oeraae2018.docentes.codDocente WHERE horariosfim.basehorarios.codDocente=$codDocente AND horariosfim.basehorarios.perAcademico='$periodo' AND horariosfim.basehorarios.estado=1");
	            $datos= $this->memoria->fetchAll(PDO::FETCH_OBJ);
	            $this->Close(1);
	            return $datos;
	        }
	        catch (Exception $a) {
	            echo "error" . $a->getMessage();
	        }
	    }

	    public function HorarioAula($codAula,$periodo)
	    {
	        try {
	            $this->Conectar(1);
	            $this->memoria = $this->con1->query("SELECT horariosfim.basehorarios.*,oeraae2018.aulas.capacidad,oeraae2018.aulas.pizarra,oeraae2018.aulas.taburete,oeraae2018.docentes.apePaterno,oeraae2018.docentes.apeMaterno,oeraae2018.docentes.nombres from horariosfim.basehorarios INNER JOIN oeraae2018.aulas ON horariosfim.basehorarios.codAula=oeraae2018.aulas.aula INNER JOIN oeraae2018.docentes ON horariosfim.basehorarios.codDocente=oeraae2018.docentes.codDocente WHERE horariosfim.basehorarios.codAula='$codAula' AND horariosfim.basehorarios.perAcademico='$periodo' AND horariosfim.basehorarios.estado=1");
	            
	            $datos = $this->memoria->fetchAll(PDO::FETCH_OBJ);
	            $this->Close(1);
	            return $datos;
	        }
	        catch (Exception $a) {
	            echo "error" . $a->getMessage();
	        }
	    }

	    public function HorarioCurso($codCurso,$periodo)
	    {
	        try {
	            $this->Conectar(1);
	            $this->memoria = $this->con1->query("SELECT horariosfim.basehorarios.*,oeraae2018.docentes.apePaterno,oeraae2018.docentes.apeMaterno,oeraae2018.docentes.nombres,oeraae2018.cursos.nomCurso from horariosfim.basehorarios INNER JOIN oeraae2018.docentes ON horariosfim.basehorarios.codDocente=oeraae2018.docentes.codDocente INNER JOIN oeraae2018.cursos ON horariosfim.basehorarios.codCurso=oeraae2018.cursos.codCurso WHERE horariosfim.basehorarios.codCurso='$codCurso' AND horariosfim.basehorarios.perAcademico='$periodo' AND horariosfim.basehorarios.estado=1");
	            
	            $datos = $this->memoria->fetchAll(PDO::FETCH_OBJ);
	            $this->Close(1);
	            return $datos;
	        }
	        catch (Exception $a) {
	            echo "error" . $a->getMessage();
	        }
	    }
	    
	    public function Modulos($ciclo,$grupo,$periodo)
	    {
	        try {
	            $this->Conectar(1);
	            $this->memoria = $this->con1->query("SELECT horariosfim.basehorarios.*,oeraae2018.aulas.capacidad,oeraae2018.aulas.pizarra,oeraae2018.aulas.taburete,oeraae2018.docentes.apePaterno,oeraae2018.docentes.apeMaterno,oeraae2018.docentes.nombres from horariosfim.basehorarios INNER JOIN oeraae2018.aulas ON horariosfim.basehorarios.codAula=oeraae2018.aulas.aula INNER JOIN oeraae2018.docentes ON horariosfim.basehorarios.codDocente=oeraae2018.docentes.codDocente WHERE horariosfim.basehorarios." . $ciclo . " LIKE '%" . $grupo . "%' AND horariosfim.basehorarios.perAcademico='$periodo' AND horariosfim.basehorarios.estado=1");
	            
	            $datos = $this->memoria->fetchAll(PDO::FETCH_OBJ);
	            $this->Close(1);
	            return $datos;
	        }
	        catch (Exception $a) {
	            echo "error" . $a->getMessage();
	        }
	    }
	}
?>